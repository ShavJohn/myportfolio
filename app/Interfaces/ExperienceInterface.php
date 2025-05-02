<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Experience;

interface ExperienceInterface
{
    /**
     * Undocumented function
     *
     * @param [type] $data
     * @return mixed
     */
    public function store($data): Experience;

    /**
     * Undocumented function
     *
     * @return mixed
     */
    public function getAll(): Collection;
    
    /**
     * Undocumented function
     *
     * @param [type] $id
     * @return mixed
     */
    public function get($id): Experience;

    /**
     * Undocumented function
     *
     * @param [type] $data
     * @return mixed
     */
    public function update($id, $data): bool;

    /**
     * Undocumented function
     *
     * @param [type] $id
     * @return mixed
     */
    public function delete($id): bool;
}