<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\FileManagerService;
use Illuminate\Support\Facades\Log;
use App\Interfaces\SettingsInterface;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    /**
     * Undocumented variable
     *
     * @var SettingsInterface
     */
    public SettingsInterface $SettingsRepo;

    public FileManagerService $fileManager;

    /**
     * Undocumented function
     *
     * @param SettingsInterface $settings_interface
     */
    public function __construct(SettingsInterface $settings_interface, FileManagerService $file_manager_service)
    {
        $this->SettingsRepo = $settings_interface;
        $this->fileManager = $file_manager_service;
    }

    public function getSettings()
    {
        try {

            $res = $this->SettingsRepo->getSettings();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'settings' => $res,
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

    public function storeOrUpdate(Request $request): JsonResponse
    {
        try {

            $settingData = $request->all();
            
            $payloadDaya = [
                'key' => $settingData['key'],
                'value' => array_key_exists('value' ,$settingData) ? $settingData['value'] : '',
                'json_value' => array_key_exists('json_value' ,$settingData) ? $settingData['json_value'] : '',
                'setting_type' => array_key_exists('setting_type' ,$settingData) ? $settingData['setting_type'] : ''
            ];

            $this->SettingsRepo->storeOrUpdate($payloadDaya);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Setting updated successfuly',
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

    public function removeSetting($settingType): JsonResponse
    {
        try {
            $res = $this->SettingsRepo->delete($settingType);

            if($res) {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'Setting removed successfuly',
                ], 200);
            }
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Something went wrong',
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

    public function uploadLogo(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
        
            $file = $request->file('image');

            $res = $this->fileManager->upload($file);

            $data = [
                'key' => 'logo',
                'value' => $res['path']
            ];

            $this->SettingsRepo->storeOrUpdate($data);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Logo has been uploaded',
                'logo' => $res['path']
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

    public function deleteLogo($logo): JsonResponse
    {
        try {

            $this->fileManager->delete($logo . '.webp');

            $this->SettingsRepo->delete('logo');

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Logo has been deleted',
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
}
