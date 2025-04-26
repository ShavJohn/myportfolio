<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Filesystem\Filesystem;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class FileManagerService
{

    /**
     * @var \Illuminate\Contracts\Filesystem\Filesystem
     */
    protected Filesystem $disk;

    /**
     * Undocumented variable
     *
     * @var ImageManager
     */
    protected ImageManager $imageManager;

    /**
     * FileManagerService constructor.
     * @param Filesystem $filesystem
     */
    public function __construct(Filesystem $filesystem)
    {
        $this->disk = $filesystem;
        $this->disk = Storage::disk('public');
        $this->imageManager = new ImageManager(new Driver());
    }

    public function upload($file, string $folder = 'uploads'): Array
    {
        try {
            $image = $this->imageManager->read($file->getRealPath())->toWebp(quality: 70);

            // Generate random hashed filename
            $hashName = time() . '_' . str_shuffle('local_project_image') . '.webp';


            $data = [
                'file' => $file,
                'image' => $image,
                'hashName' => $hashName,
            ];

            Storage::disk('public')->put($hashName, (string) $image);

            return [
                'success' => 1,
                'message' => 'Image uploaded successfully.',
                'path' => $hashName,
            ];
        } catch (\Exception $e) {
            Log::error($e);

            return [
                'success' => 0,
                'message' => 'Upload failed.' . $e,
            ];
        }
    }

    public function delete(string $path): Array
    {
        try {
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);

                return [
                    'success' => 1,
                    'message' => 'Image deleted successfully.',
                ];
            }

            return [
                'success' => 0,
                'message' => 'File not found.',
            ];
        } catch (\Exception $e) {
            Log::error($e);

            return [
                'success' => 0,
                'message' => 'Delete failed.',
            ];
        }
    }

}