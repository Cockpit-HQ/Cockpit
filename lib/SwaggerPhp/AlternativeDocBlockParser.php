<?php

namespace SwaggerPhp;

use OpenApi\Annotations as OA;
use OpenApi\Context;
use OpenApi\Generator;
use PHPStan\PhpDocParser\Lexer\Lexer;
use PHPStan\PhpDocParser\Parser\ConstExprParser;
use PHPStan\PhpDocParser\Parser\PhpDocParser;
use PHPStan\PhpDocParser\Parser\TokenIterator;
use PHPStan\PhpDocParser\Parser\TypeParser;
use PHPStan\PhpDocParser\ParserConfig;
use PHPStan\PhpDocParser\Ast\PhpDoc\Doctrine\DoctrineTagValueNode;
use PHPStan\PhpDocParser\Ast\PhpDoc\Doctrine\DoctrineAnnotation;
use PHPStan\PhpDocParser\Ast\PhpDoc\Doctrine\DoctrineArgument;
use PHPStan\PhpDocParser\Ast\PhpDoc\Doctrine\DoctrineArray;
use PHPStan\PhpDocParser\Ast\ConstExpr\ConstExprStringNode;
use PHPStan\PhpDocParser\Ast\ConstExpr\ConstExprIntegerNode;
use PHPStan\PhpDocParser\Ast\ConstExpr\ConstExprFloatNode;
use PHPStan\PhpDocParser\Ast\ConstExpr\ConstExprTrueNode;
use PHPStan\PhpDocParser\Ast\ConstExpr\ConstExprFalseNode;
use PHPStan\PhpDocParser\Ast\ConstExpr\DoctrineConstExprStringNode;
use PHPStan\PhpDocParser\Ast\Type\IdentifierTypeNode;

class AlternativeDocBlockParser
{
    private $parser;
    private $lexer;
    private $aliases = [];

    public function __construct(array $aliases = [])
    {
        $config = new ParserConfig([]);
        $this->lexer = new Lexer($config);
        $constExprParser = new ConstExprParser($config);
        $typeParser = new TypeParser($config, $constExprParser);
        $this->parser = new PhpDocParser($config, $typeParser, $constExprParser);
        $this->aliases = $aliases;
    }

    public function setAliases(array $aliases): void
    {
        $this->aliases = $aliases;
    }

    public static function isEnabled(): bool
    {
        return true;
    }

    public function fromComment(string $comment, Context $context): array
    {
        $context->comment = $comment;

        try {
            Generator::$context = $context;
            if ($context->is('annotations') === false) {
                $context->annotations = [];
            }

            $tokens = new TokenIterator($this->lexer->tokenize($comment));
            $node = $this->parser->parse($tokens);

            $annotations = [];
            foreach ($node->children as $child) {
                if ($child instanceof \PHPStan\PhpDocParser\Ast\PhpDoc\PhpDocTagNode) {
                    if ($child->value instanceof DoctrineTagValueNode) {
                        $annotation = $this->hydrateAnnotation($child->value->annotation, $context);
                        if ($annotation) {
                            $annotations[] = $annotation;
                        }
                    }
                }
            }
            return $annotations;

        } catch (\Exception $e) {
             $context->logger->error(
                $e->getMessage() . ($context->filename ? ('; file=' . $context->filename) : ''),
                ['exception' => $e]
            );
            return [];
        } finally {
            Generator::$context = null;
        }
    }

    private function hydrateAnnotation(DoctrineAnnotation $node, Context $context)
    {
        $class = $this->resolveClass($node->name);
        if (!\class_exists($class)) {
            return null;
        }

        $properties = ['_context' => $context];
        $unnamed = [];
        foreach ($node->arguments as $arg) {
            $value = $this->resolveValue($arg->value, $context);
            if ($arg->key) {
                $properties[$arg->key->name] = $value;
            } else {
                $unnamed[] = $value;
            }
        }

        if (!empty($unnamed)) {
            if (\count($unnamed) === 1) {
                $properties['value'] = $unnamed[0];
            } else {
                $properties['value'] = $unnamed;
            }
        }

        return new $class($properties);
    }

    private function resolveClass(string $name): string
    {
        // Remove leading @ if present
        if (\strpos($name, '@') === 0) {
            $name = \substr($name, 1);
        }

        // Handle leading backslash
        if (\strpos($name, '\\') === 0) {
            return $name;
        }

        $parts = \explode('\\', $name);
        $first = \strtolower(\array_shift($parts));

        if (isset($this->aliases[$first])) {
            \array_unshift($parts, $this->aliases[$first]);
            return \implode('\\', $parts);
        }
        
        return $name;
    }

    private function resolveValue($value, Context $context)
    {
        if ($value instanceof DoctrineConstExprStringNode) {
            return $value->value;
        }
        if ($value instanceof ConstExprStringNode) {
            return $value->value;
        }
        if ($value instanceof ConstExprIntegerNode) {
            return (int) $value->value;
        }
        if ($value instanceof ConstExprFloatNode) {
            return (float) $value->value;
        }
        if ($value instanceof ConstExprTrueNode) {
            return true;
        }
        if ($value instanceof ConstExprFalseNode) {
            return false;
        }
        if ($value instanceof DoctrineAnnotation) {
            return $this->hydrateAnnotation($value, $context);
        }
        if ($value instanceof DoctrineArray) {
            $array = [];
            foreach ($value->items as $item) {
                $val = $this->resolveValue($item->value, $context);
                if ($item->key) {
                    $key = $this->resolveValue($item->key, $context);
                    $array[$key] = $val;
                } else {
                    $array[] = $val;
                }
            }
            return $array;
        }

        if ($value instanceof IdentifierTypeNode) {
             if ($value->name === 'true') return true;
             if ($value->name === 'false') return false;
             if ($value->name === 'null') return null;
             return $value->name;
        }
        
        return null;
    }
}
