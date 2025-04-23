<?php

namespace App\Services;

use Carbon\Carbon;

class StatisticsService
{

    /**
     * @param $startDate
     * @param $endDate
     * @param $statistics
     * @param $interval
     * @return array
     */
    public function generateStatisticsData($startDate, $endDate, $statistics, $interval): array
    {
        // Initialize the result array
        $result = [];

        // Initialize Carbon instances for start and end dates
        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        // Determine the date format based on the interval
        $dateFormat = ($interval == 'year' || $interval == 'all_time') ? 'Y-m' : 'Y-m-d';

        // Loop through each date or month, depending on the interval
        while ($start <= $end) {
            $dateString = $start->format($dateFormat);

            // Initialize the statistics data for the current date or month
            $statisticsData = 0;

            // Loop through the statistics array to find matching data
            foreach ($statistics as $statistic) {

                $statisticDate = Carbon::parse($statistic['statistics_date']);
                // Check if the statistic date matches the current date or month
                if ($statisticDate->format($dateFormat) === $dateString) {
                    // Add the statistic count to the current statistics data
                    $statisticsData += $statistic['statistics_count'];
                }
            }

            // Add the statistics data to the result array
            $result['x'][] = $dateString;
            $result['y'][] = $statisticsData;

            // Increment the date or month based on the interval
            if ($interval == 'week') {
                $start->addDay();
            } elseif ($interval == 'month') {
                $start->addDay();
            } elseif ($interval == 'year' || $interval == 'all_time') {
                $start->addMonth();
            }
        }

        return $result;
    }

    public function makeDataForChart($data)
    {

    }
}