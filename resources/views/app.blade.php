<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Laravel</title>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/ts/app.tsx'])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>