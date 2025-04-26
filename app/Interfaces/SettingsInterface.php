<?php

namespace App\Interfaces;

interface SettingsInterface
{
    
     /**
     * @param $page_setting
     * @return mixed
     */
    public function getSettings(): mixed;


    /**
     * Undocumented function
     *
     * @param [type] $data
     * @return mixed
     */
    public function store($data): mixed;

    /**
     * Undocumented function
     *
     * @param [type] $key
     * @return mixed
     */
    public function ifExist($key): mixed;

    /**
     * Undocumented function
     *
     * @param [type] $key
     * @return mixed
     */
    public function delete($key): mixed;

}