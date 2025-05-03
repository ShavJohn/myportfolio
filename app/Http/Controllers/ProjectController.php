<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\ProjectsInterface;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Services\FileManagerService;

class ProjectController extends Controller
{
    private ProjectsInterface $projectsRepo;

    private FileManagerService $fileManagerService;

    public function __construct(ProjectsInterface $projects, FileManagerService $fileManagerService)
    {
        $this->projectsRepo = $projects;
        $this->fileManagerService = $fileManagerService;
    }

    /**
     * Get all projects
     *
     * @return JsonResponse
     */
    public function getProjects(): JsonResponse
    {
        try {
            $projects = $this->projectsRepo->all();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'projects' => $projects,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            $message = config('app.debug')
                ? $exception->getMessage()
                : 'Failed to fetch projects. Please try again later.';

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
    public function uploadProjectImage(Request $request): JsonResponse
    {
        try {

            $file = $request->file('image');

            $res = $this->fileManagerService->upload($file);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Image has been uploaded',
                'image' => $res
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            $message = config('app.debug')
                ? $exception->getMessage()
                : 'Failed to fetch projects. Please try again later.';

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
     * @param [type] $image
     * @return JsonResponse
     */
    public function deleteProjectImage($image): JsonResponse
    {
        try {

            $this->fileManagerService->delete($image . '.webp');

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Image has been deleted',
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            $message = config('app.debug')
                ? $exception->getMessage()
                : 'Failed to fetch projects. Please try again later.';

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 500);
        }
    }

    /**
     * Store a new project
     *
     * @param ProjectRequest $request
     * @return JsonResponse
     */
    public function storeProject(ProjectRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $project = $this->projectsRepo->create($request->validated());

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Project has been created.',
                'project' => $project,
            ], 201);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            $message = config('app.debug')
                ? $exception->getMessage()
                : 'Failed to create project. Please try again later.';

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 500);
        }
    }

    /**
     * Show a project
     *
     * @param int $id
     * @return JsonResponse
     */
    public function showProject(int $id): JsonResponse
    {
        try {
            $project = $this->projectsRepo->find($id);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'project' => $project,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            $message = config('app.debug')
                ? $exception->getMessage()
                : 'Project not found or an error occurred.';

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 404);
        }
    }

    /**
     * Update a project
     *
     * @param ProjectRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateProject(ProjectRequest $request, int $id): JsonResponse
    {
        try {
            DB::beginTransaction();

            $project = $request->validated();

            $updated = $this->projectsRepo->update($id, $project);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Project has been updated.',
                'project' => $updated,
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            $message = config('app.debug')
                ? $exception->getMessage()
                : 'Failed to update project. Please try again later.';

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 500);
        }
    }

    /**
     * Delete a project
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deleteProject(int $id): JsonResponse
    {
        try {
            DB::beginTransaction();

            $deleted = $this->projectsRepo->delete($id);

            if ($deleted) {
                DB::commit();
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message' => 'Project has been deleted.',
                ], 200);
            }

            DB::rollBack();
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => 'Failed to delete project.',
            ], 400);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            $message = config('app.debug')
                ? $exception->getMessage()
                : 'Failed to delete project. Please try again later.';

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message' => $message,
            ], 500);
        }
    }
}
