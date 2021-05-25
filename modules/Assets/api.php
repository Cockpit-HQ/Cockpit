<?php

/**
 * @OA\Get(
 *     path="/assets/thumbnail",
 *     @OA\Response(response="200", description="Url to generated image or binary if parameter `o=1`"),
 *     @OA\Response(response="404", description="Asset not found")
 * )
 */