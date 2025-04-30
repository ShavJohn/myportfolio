@extends('emails.layouts.body')
@section('content')
<div class="margin-top">
<span>Hello dear</span>
<b>{{ $messageSelected['name'] }}</b>
</div>
<div class="inner-body">
<div style="padding: 20px;">
<h2>{{ $replyData['title'] }}</h2>
<p style="font-size: 16px; color: #4A5568;">{{ $replyData['message'] }}</p>
</div>
</div>
@endsection