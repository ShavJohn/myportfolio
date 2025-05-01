<?php

namespace App\Interfaces;

interface SkillsInterface
{
    /**
     * Undocumented function
     *
     * @return mixed
     */
    public function getSkills(): mixed;

    /**
     * Undocumented function
     *
     * @param [type] $skill
     * @return mixed
     */
    public function storeSkill($skill): mixed;

    /**
     * Undocumented function
     *
     * @param [type] $skill
     * @return mixed
     */
    public function removeSkill($skillId): mixed;
}