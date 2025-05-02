<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Interfaces\ExperienceInterface;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\ExperienceRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ExperienceController extends Controller
{
    /**
     * Undocumented variable
     *
     * @var ExperienceInterface
     */
    private ExperienceInterface $experienceRepo;

    /**
     * Undocumented function
     *
     * @param ExperienceInterface $experience
     */
    public function __construct(ExperienceInterface $experience)
    {
        $this->experienceRepo = $experience;
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(ExperienceRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $experience = $request->validated();

            $experience['startDate'] = Carbon::parse($experience['startDate'])->format('Y-m-d H:i:s');
            $experience['endDate'] = Carbon::parse($experience['endDate'])->format('Y-m-d H:i:s');

            $this->experienceRepo->store($experience);

            DB::commit();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Experience stored successfully.',
                'experince' => $experience,
            ], 200);
        } catch (\Exception $e) {
            Log::error($e);
            DB::rollBack();
            $message = config('app.debug') 
                ? $e->getMessage()
                : 'An unexpected error occurred.';

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
     * @return JsonResponse
     */
    public function getAll(): JsonResponse
    {
        try {
            $experiences = $this->experienceRepo->getAll();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'data' => $experiences,
            ]);
        } catch (\Exception $e) {
            Log::error($e);
            $message = config('app.debug') 
                ? $e->getMessage()
                : 'Failed to retrieve experiences.';
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
     * @param integer $id
     * @return JsonResponse
     */
    public function get(int $id): JsonResponse
    {
        try {
            $experience = $this->experienceRepo->get($id);
            if (!$experience) {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message' => 'Experience not found.',
                ], 404);
            }

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'data' => $experience,
            ]);
        } catch (\Exception $e) {
            Log::error($e);
            $message = config('app.debug') 
                ? $e->getMessage()
                : 'Failed to retrieve experience.';
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
     * @param ExperienceRequest $request
     * @param integer $id
     * @return JsonResponse
     */
    public function update(ExperienceRequest $request, int $id): JsonResponse 
    {
        try {
            DB::beginTransaction();

            $experience = $request->validated();

            $experience['startDate'] = Carbon::parse($experience['startDate'])->format('Y-m-d H:i:s');
            $experience['endDate'] = Carbon::parse($experience['endDate'])->format('Y-m-d H:i:s');

            $this->experienceRepo->update($id, $experience);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Experience stored successfully.',
                'data' => $experience,
            ], 200);
        } catch (\Exception $e) {
            Log::error($e);
            DB::rollBack();
            $message = config('app.debug') 
                ? $e->getMessage()
                : 'An unexpected error occurred.';

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
     * @param integer $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        try {
            DB::beginTransaction();

            $deleted = $this->experienceRepo->delete($id);

            DB::commit();

            return response()->json([
                'success' => $deleted ? 1 : 0,
                'type' => $deleted ? 'success' : 'error',
                'message' => $deleted ? 'Experience deleted.' : 'Experience not found.',
            ], $deleted ? 200 : 404);
        } catch (\Exception $e) {
            Log::error($e);
            DB::rollBack();
            $message = config('app.debug') 
                ? $e->getMessage()
                : 'Failed to delete experience.';
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 500);
        }
    }
}
