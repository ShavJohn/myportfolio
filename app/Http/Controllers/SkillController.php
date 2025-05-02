<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\SkillsInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class SkillController extends Controller
{
    /**
     * Undocumented variable
     *
     * @var SkillsInterface
     */
    public SkillsInterface $skillsRepo;

    /**
     * Undocumented function
     *
     * @param SkillsInterface $skills
     */
    public function __construct(SkillsInterface $skills)
    {
        $this->skillsRepo = $skills;
    }

    /**
     * Undocumented function
     *
     * @return JsonResponse
     */
    public function getSkills(): JsonResponse
    {
        try {

            $skills = $this->skillsRepo->getSkills();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'skills' => $skills,
            ], 200);
        } catch(\Exception $exception) {
            Log::error($exception);
            $message = config('app.debug') 
                ? $exception->getMessage()
                : 'Something went wrong, please try again later.';

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 500);
        }
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storeSkill(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $skill = $request->all();

            $res = $this->skillsRepo->storeSkill($skill);

            if($res) {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message' => 'Skill has been stored',
                ], 200);
            }

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'There was issue',
            ], 200);
        } catch(\Exception $exception) {
            Log::error($exception);
            DB::rollBack();
            $message = config('app.debug') 
                ? $exception->getMessage()
                : 'Something went wrong, please try again later.';

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 500);
        }
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function removeSkill($skillId): JsonResponse
    {
        try {
            DB::beginTransaction();
            $res = $this->skillsRepo->removeSkill($skillId);

            if($res) {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message' => 'Skill has been removed',
                ], 200);
            }

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'There was issue',
            ], 200);

        } catch(\Exception $exception) {
            Log::error($exception);
            DB::rollBack();
            $message = config('app.debug') 
                ? $exception->getMessage()
                : 'Something went wrong, please try again later.';

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 500);
        }
    }
}
