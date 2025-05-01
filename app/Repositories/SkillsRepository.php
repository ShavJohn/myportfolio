<?php

namespace App\Repositories;

use App\Interfaces\SkillsInterface;
use App\Models\Skill;

class SkillsRepository implements SkillsInterface
{

    /**
     * Undocumented variable
     *
     * @var Skill
     */
    protected Skill $model;

    /**
     * Undocumented function
     *
     * @param Skill $skill
     */
    public function __construct(Skill $skill)
    {
        $this->model = $skill;
    }

    /**
     * Undocumented function
     *
     * @return mixed
     */
    public function getSkills(): mixed
    {
        return $this->model->get();
    }

    /**
     * Undocumented function
     *
     * @param [type] $skill
     * @return mixed
     */
    public function storeSkill($skill): mixed
    {
        return $this->model->create($skill);
    }

    /**
     * Undocumented function
     *
     * @param [type] $skill
     * @return mixed
     */
    public function removeSkill($skillId): mixed
    {
        return $this->model->where('id', $skillId)->delete();
    }
}