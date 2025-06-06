<?php

namespace App\Providers;

use App\Interfaces\EmailInterface;
use App\Repositories\EmailRepository;
use App\Interfaces\SettingsInterface;
use App\Repositories\SettingsRepository;
use App\Interfaces\StatisticsInterface;
use App\Repositories\StatisticsRepository;
use App\Interfaces\SkillsInterface;
use App\Repositories\SkillsRepository;
use App\Interfaces\ExperienceInterface;
use App\Interfaces\ProjectsInterface;
use App\Repositories\ExperienceRepository;
use App\Repositories\ProjectsRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(
            EmailInterface::class,
            EmailRepository::class
        );
        $this->app->bind(
            SettingsInterface::class,
            SettingsRepository::class
        );
        $this->app->bind(
            StatisticsInterface::class,
            StatisticsRepository::class
        );
        $this->app->bind(
            SkillsInterface::class,
            SkillsRepository::class
        );
        $this->app->bind(
            ExperienceInterface::class,
            ExperienceRepository::class
        );
        $this->app->bind(
            ProjectsInterface::class,
            ProjectsRepository::class
        );
    }
}
