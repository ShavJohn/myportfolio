<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $requestData = $request->all();

            $requestData['password'] = Hash::make($requestData['password']);

            $user = User::create($requestData);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'User registered successfully',
            ], 200);
        } catch (\Exception $exception) {
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
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {

             $user = User::where('email', $request->email)->first();

            if($user) {
                if (Hash::check($request->password, $user->password)) {

                    $token = $user->createToken('authToken');
                    $accessToken = $token->accessToken;
                    Auth::login($user);

                    return response()->json([
                        'success' => 1,
                        'type' => 'success',
                        'message'  => trans('main.logged_in'),
                        'authUser' => $user,
                        'token' => $accessToken,
                    ], 200);
                } else {
                    return response()->json([
                        'success' => 0,
                        'type' => 'error',
                        'message'  => 'Something went wrong',
                    ]);
                }
            }

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ]);
        } catch (\Exception $exception) {
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
     * @return JsonResponse
     */
    public function checkAuth(): JsonResponse
    {
        try {
            $user = auth()->guard()->user();

            if($user) {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'You are Logged in',
                    'authUser' => $user,
                ], 200);
            } else {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'You aren\'t Logged in',
                    'authUser' => [],
                ], 200);
            }
        } catch (\Exception $exception) {
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
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
    public function changeUserData(Request $request, User $user): JsonResponse
    {
        try {
            if($user->id) {
                if(!$request->name || !$request->email) {
                    if(!$request->name) {
                        return response()->json([
                            'success' => 0,
                            'type' => 'error',
                            'message'  => 'Your name field is required',
                        ]);
                    } else {
                        return response()->json([
                            'success' => 0,
                            'type' => 'error',
                            'message'  => 'Your email field is required',
                        ]);
                    }
                } else {
                    if($request->password) {
                        if (!Hash::check($request->password, $user->password)) {
                            return response()->json([
                                'success' => 0,
                                'type' => 'error',
                                'message'  => 'Your old password is wrong',
                            ]);
                        }
                    }

                    if($request->newPassword || $request->newPasswordConfirm) {
                        if($request->newPassword !== $request->newPasswordConfirm) {
                            return response()->json([
                                'success' => 0,
                                'type' => 'error',
                                'message'  => 'Your password and password confirmation are different',
                            ]);
                        }
                        else {
                            if(strlen($request->newPassword) >= 8) {
                                $user->password = Hash::make($request->newPassword);
                            } else {
                                return response()->json([
                                    'success' => 0,
                                    'type' => 'error',
                                    'message'  => 'Your new password is too short',
                                ]);
                            }

                        }
                    }

                    $user->name = $request->name;

                    if($request->email !== $user->email) {
                        $emailValidate = $request->validate([
                            'email'  =>  'email|unique:users',
                        ]);

                        if($emailValidate) {
                            $user->email = $request->email;
                        } else {
                            return response()->json([
                                'success' => 0,
                                'type' => 'error',
                                'message'  => 'Email is already taken',
                            ]);
                        }
                    }

                    $user->notification_switch = $request->notification_switch;

                    $user->save();

                    return response()->json([
                        'success' => 1,
                        'type' => 'success',
                        'message'  => 'Your data has been updated',
                    ], 200);
                }
            } else {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'Something went wrong',
                ]);
            }
        } catch (\Exception $exception) {
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

    /***
     * @param Request $request
     * @return JsonResponse
     */
    public function logOut(Request $request): JsonResponse
    {
        try {
            $token = $request->user()->token();
            $token->revoke();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'You are Logged out',
            ]);
        } catch (\Exception $exception) {
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
