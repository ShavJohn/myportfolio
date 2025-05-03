<?php

namespace App\Interfaces;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Project;

interface ProjectsInterface
{
    /**
     * Undocumented function
     *
     * @return Collection
     */
    public function all(): Collection;

    /**
     * Undocumented function
     *
     * @param integer $id
     * @return Project
     */
    public function find(int $id): Project;

    /**
     * Undocumented function
     *
     * @param array $data
     * @return Project
     */
    public function create(array $data): Project;

    /**
     * Undocumented function
     *
     * @param integer $id
     * @param array $data
     * @return Project
     */
    public function update(int $id, array $data): mixed;

    /**
     * Undocumented function
     *
     * @param integer $id
     * @return boolean
     */
    public function delete(int $id): bool;
}