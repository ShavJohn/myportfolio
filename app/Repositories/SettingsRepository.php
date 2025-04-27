<?php

namespace App\Repositories;

use App\Interfaces\SettingsInterface;
use App\Models\Setting;

class SettingsRepository implements SettingsInterface
{
    /**
     * Undocumented variable
     *
     * @var Setting
     */
    private Setting $model;

    /**
     * Undocumented function
     *
     * @param Setting $model
     */
    public function __construct(Setting $model)
    {
        $this->model = $model;
    }

    /**
     * Undocumented function
     *
     * @return mixed
     */
    public function getSettings(): mixed
    {
        return $this->model->get();
    }

    /**
     * Undocumented function
     *
     * @param [type] $data
     * @return mixed
     */
    public function storeOrUpdate($data): mixed
    {
        if($this->ifExist($data['key'])) {
            return $this->model->where('key', $data['key'])->update($data);
        }
        return $this->model->create($data);
    }

    /**
     * Undocumented function
     *
     * @param [type] $key
     * @return mixed
     */
    public function ifExist($key): mixed
    {
        return $this->model->where('key', $key)->exists();
    }

    /**
     * Undocumented function
     *
     * @param [type] $key
     * @return mixed
     */
    public function delete($key): mixed
    {
        return $this->model->where('key', $key)->delete();
    }

} 