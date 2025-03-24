<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="{{ asset('storage/shavjohn_logo.png') }}">

        <title>ShavJohn</title>

        @vite(['resources/js/app.ts', 'resources/scss/app.scss'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
