@extends('emails.layouts.body')
@section('content')
<div class="inner-body">
<div style="padding: 20px;">
<h2>Message from: <b>{{ $name }}</b></h2>
<div style="margin-top: 15px;">
<b>User's Email:</b> {{ $email }}
</div>
@if($phone_number)
<div style="margin-top: 15px;">
<b>User's Phone:</b> {{ $phone_number }}
</div>
@endif
<div style="margin-top: 30px;">
<b>User's Message:</b>
<p style="font-size: 16px; color: #4A5568;">{{ $message }}</p>
</div>
</div>
</div>

@endsection