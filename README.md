# XIMA Drupal Manual

This module provides a manual for Drupal using the export route of the books core module.

**The current state is experimental and may contain hard codings.**

## Features

- templates for displaying a book with all of its pages on a single page
- hides the books outline for non-book-page nodes
- a minimal styling for the manual

## Requirements

- Drupal 10+

## Installation

1. Install using composer.json: `composer require xima/xm_drupal_manual`
2. Enable the module in the drupal backend as usual

## Developer instructions

### PHP quality tools

#### Rector

A rector config is provided. Run the following command to execute it:

```bash
composer run-script php:check
```

#### Build assets

Navigate to the module folder in order to rebuild the assets:

Build the minified js:

```bash
npm run js
```

Compile scss into minified css:

```bash
npm run sass
```
