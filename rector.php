<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;

return static function (RectorConfig $rectorConfig): void {
  $rectorConfig->paths([
    __DIR__,
  ]);

  $rectorConfig->fileExtensions(['php', 'module', 'theme']);

  $rectorConfig->skip([
    'vendor/',
    Rector\Php74\Rector\LNumber\AddLiteralSeparatorToNumberRector::class,
    Rector\Privatization\Rector\Class_\FinalizeClassesWithoutChildrenRector::class,
    Rector\CodingStyle\Rector\If_\NullableCompareToNullRector::class,
    Rector\CodeQuality\Rector\If_\ExplicitBoolCompareRector::class,
    Rector\CodingStyle\Rector\FuncCall\StrictArraySearchRector::class,
    Rector\Php81\Rector\Array_\FirstClassCallableRector::class,
    Rector\CodeQuality\Rector\Array_\CallableThisArrayToAnonymousFunctionRector::class,
    Rector\DeadCode\Rector\ClassMethod\RemoveUnusedPrivateMethodRector::class,
    Rector\Php73\Rector\FuncCall\JsonThrowOnErrorRector::class
  ]);

  $rectorConfig->sets([
    \Rector\Set\ValueObject\LevelSetList::UP_TO_PHP_82,
    \Rector\Set\ValueObject\SetList::CODE_QUALITY,
    \Rector\Set\ValueObject\SetList::CODING_STYLE,
    \Rector\Set\ValueObject\SetList::DEAD_CODE
  ]);
};
