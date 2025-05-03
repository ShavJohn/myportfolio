<?php

namespace App\Repositories;

use App\Models\Project;
use App\Interfaces\ProjectsInterface;
use Illuminate\Database\Eloquent\Collection;

class ProjectsRepository implements ProjectsInterface
{

    private Project $model;

    public function __construct(Project $project)
    {
        $this->model = $project;
    }

    public function all(): Collection
    {
        return $this->model->get();
    }

    public function find(int $id): Project
    {
        return $this->model->where('id', $id)->first();
    }

    public function create(array $data): Project
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        $project = $this->model->where('id', $id);
        $project->update($data);
        return $project;
    }

    public function delete(int $id): bool
    {
        $project = $this->model->where('id', $id);
        return (bool) $project->delete();
    }
}