<?php

use App\Models\Setting;

if (!function_exists('get_logo')) {
    /**
     * @return string
     */
    function get_logo(): string
    {
        $logoPath = Setting::where('key', 'logo')->first();
        if ($logoPath && $logoPath->value) {
            return '/storage/' . $logoPath->value;
        }
        return '';
    }
}

if (!function_exists('get_meta_title')) {
    /**
     * @return string
     */
    function get_meta_title(): string
    {
        $metaTitle = Setting::where('key', 'page-meta-name')->first();
        if ($metaTitle && $metaTitle->value) {
            return $metaTitle->value;
        }
        return '';
    }
}

if (!function_exists('get_meta_desc')) {
    /**
     * @return string
     */
    function get_meta_desc(): string
    {
        $metaDesc = Setting::where('key', 'page-meta-desc')->first();
        if ($metaDesc && $metaDesc->value) {
            return $metaDesc->value;
        }
        return '';
    }
}

if (!function_exists('get_company_name')) {
    /**
     * @return string
     */
    function get_company_name(): string
    {
        $companyName = Setting::where('key', 'companyName')->first();
        if ($companyName && $companyName->value) {
            return $companyName->value;
        }
        return '';
    }
}