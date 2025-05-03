<?php

namespace App\Repositories;

use App\Interfaces\ExperienceInterface;
use App\Models\Experience;
use Illuminate\Database\Eloquent\Collection;

class ExperienceRepository implements ExperienceInterface
{
    protected Experience $model;

    public function __construct(Experience $experience)
    {
        $this->model = $experience;
    }

    /**
     * Undocumented function
     *
     * @param [type] $data
     * @return mixed
     */
    public function store($data): Experience
    {
        return $this->model->create($data);
    }

    /**
     * Undocumented function
     *
     * @return mixed
     */
    public function getAll(): Collection
    {
        return $this->model->get();
    }
    
    /**
     * Undocumented function
     *
     * @param [type] $id
     * @return mixed
     */
    public function get($id): Experience
    {
        return $this->model->where('id', $id)->first();
    }

    /**
     * Undocumented function
     *
     * @param [type] $data
     * @return mixed
     */
    public function update($id, $data): bool
    {
        return (bool) $this->model->where('id', $id)->update($data);
    }

    /**
     * Undocumented function
     *
     * @param [type] $id
     * @return mixed
     */
    public function delete($id): bool
    {
        return (bool) $this->model->where('id', $id)->delete();
    }
}