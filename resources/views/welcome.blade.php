<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @if(get_meta_title())
            <title>{{ get_meta_title() }}</title>
        @else
            <title>{{ config('app.name', 'ShavJohn') }}</title>
        @endif

        @if(get_meta_desc())
            <meta name="description" content="{{ get_meta_desc() }}">
        @endif
        @if(get_logo())
            <link rel="icon" type="image/png" href="{{ url('/') . get_logo() }}">
        @endif

        @vite(['resources/js/app.ts', 'resources/scss/app.scss'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
