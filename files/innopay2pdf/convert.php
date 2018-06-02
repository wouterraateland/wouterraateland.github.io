<?php
include('mpdf/mpdf.php');

function getScore($a) {
	if ($a < 3) {
		return 1;
	} else if ($a < 4) {
		return 2;
	} else {
		return 3;
	}
}

$score = array(
	array(3.8),
	array(3, 5, 4),
	array(3, 2.7, 1.2),
	array(1.5, 2, 3.5));

//$strategy =     $score[0][0]/5;
$organisation = ($score[0][0] + $score[1][0] + $score[1][1] + $score[1][2])/20;
$ecosystem =    ($score[2][0] + $score[2][1] + $score[2][2])/15;
$environment =  ($score[3][0] + $score[3][1] + $score[3][2])/15;

$min = min($organisation, $ecosystem, $environment);
$max = max($organisation, $ecosystem, $environment);

if ($max - $min > 0.1) { 
	$bottomLine = '
	<text x="368" y="' . (272 - 240*$max)  . '" text-anchor="start" font-size="12px">2. Co-creation opportunity</text>
	<path d="m 16,' . (256 - 240*$max)  . ' 496,0" fill="none" stroke="#999999"/>
	<text x="368" y="' . (272 - 240*$min)  . '" text-anchor="start" font-size="12px">1. Co-creation capability</text>
	<path d="m 16,' . (256 - 240*$min)  . ' 496,0" fill="none" stroke="#999999"/>';
} else {
	$bottomLine = '
	<text x="368" y="' . (272 - 240*$min)  . '" text-anchor="start" font-size="12px">1. Co-creation capability</text>
	<path d="m 16,' . (256 - 240*$min)  . ' 496,0" fill="none" stroke="#999999"/>';
}


$today = date("F j, Y");
$ax = 256 + $organisation*0;  $ay = 256 - $organisation*100;
$bx = 256 + $ecosystem*87; $by = 256 + $ecosystem*50;
$cx = 256 - $environment*87; $cy = 256 + $environment*50;

$pos = array();
array_push($pos, (strval($ax) . ',' . strval($ay)));
array_push($pos, (strval($bx - $ax) . ',' . strval($by - $ay)));
array_push($pos, (strval($cx - $bx) . ',' . strval($cy - $by)));

$html = '
<html><head>
	<meta http-equiv="Content-Language" content="en-GB">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<style>
		body { font-family: calibri, sans-serif; }

		a, h1, h2, h3 { color: #3097fc; }

		li {
			font-weight: bold;
			color: #3097fc; }

			li span {
				font-weight: normal;
				color: #000; }

		th.left { text-align: left; }
		.center { text-align: center; }

		.head { background-color: #3097fc; }
			.head th { color: #FFFFFF; }

		.light { background-color: #FFFFFF; }
		.dark { background-color: #E6E6E6; }

		.slider {
			width: 50mm;

			text-align: left;
			font-weight: bold;

			background-image: url(mpdf/slider.svg);
			background-size: 50mm;
			background-position: center;

			color: #FFFFFF; }

		.ball { font-size: 0; }
	</style>
</head><body>

<!--mpdf
<!-- DEFINE HEADERS & FOOTERS -->
<htmlpageheader name="firstPageHeader">
<div style="margin: 0 -20mm; padding: 0 20mm; font-family: sans-serif; color: #FFF; background-image:url(mpdf/header.jpg); background-position: center; background-size: cover;" align="center">
	<img style="float: right; width: 50mm;" src="mpdf/logo.png">
	<h1 style="text-align: left; padding: 25mm 0 10mm; color: #FFF">Co-creation Opportunity Scan (COCOS)</h1>
	<p style="text-align: right;">' . $today . '</p>
</div>
</htmlpageheader>
<htmlpageheader name="otherPageHeader">
</htmlpageheader>
<htmlpagefooter name="footer" style="display:none">
<table width="100%" style="font-family: sans-serif; vertical-align: top; line-height: 1.5;">
<tbody>
	<tr>
		<td>Innopay<br>WTC-F Tower, 3rd floor<br>Strawinskylaan 381<br>1077 XX, Amsterdam</td>
		<td style="padding-left: 40mm;">Your contact person: Tom Rijks<br><a href="mailto:tom.rijks@innopay.com">tom.rijks@innopay.com</a><br>+31 6 41 86 67 17</td>
	</tr>
</tbody>
</table>
</htmlpagefooter>
mpdf-->

<!--mpdf
<sethtmlpageheader name="firstPageHeader" value="on" show-this-page="1" />
<sethtmlpageheader name="otherPageHeader" value="on" />
<sethtmlpagefooter name="footer" page="O" value="on" show-this-page="1" />
mpdf-->

<div style="clear: both; height: 45mm;">&nbsp;</div>
<h1 style="margin-bottom: 5mm;">Your individual Co-Creation Results</h1>
<div style="width: 105mm; float: left;">
	<svg width="105mm" viewBox="0 0 512 256">
		<rect x="32"  y="' . (256 - 240*$organisation) . '" width="96" height="' . (240*$organisation - 48) . '" stroke="none" fill="#3097fc"/>
		<rect x="144" y="' . (256 - 240*$ecosystem)    . '" width="96" height="' . (240*$ecosystem    - 48) . '" stroke="none" fill="#f6871f"/>
		<rect x="256" y="' . (256 - 240*$environment)  . '" width="96" height="' . (240*$environment  - 48) . '" stroke="none" fill="#87cc00"/>

		<text x="368" y="32" text-anchor="start" font-size="12px">3. Co-creation potential</text>
		<path d="m 16,16						496,0" fill="none" stroke="#999999"/>
		' . $bottomLine . '

		<path d="m 16,208 496,0"  fill="none" stroke="#000000"/>
		<path d="m 16,208 0,-192" fill="none" stroke="#000000"/>

		<path d="m 11,208 10,0" fill="none" stroke="#000000"/>
		<path d="m 11,160 10,0" fill="none" stroke="#000000"/>
		<path d="m 11,112 10,0" fill="none" stroke="#000000"/>
		<path d="m 11,64  10,0" fill="none" stroke="#000000"/>
		<path d="m 11,16  10,0" fill="none" stroke="#000000"/>

		<text x="4" y="214" text-anchor="middle" font-size="16px">1</text>
		<text x="4" y="166" text-anchor="middle" font-size="16px">2</text>
		<text x="4" y="118" text-anchor="middle" font-size="16px">3</text>
		<text x="4" y="70" text-anchor="middle" font-size="16px">4</text>
		<text x="4" y="22" text-anchor="middle" font-size="16px">5</text>

		<text x="72"  y="232" text-anchor="middle" font-size="16px">Internal</text>
		<text x="72"  y="252" text-anchor="middle" font-size="16px">organisation</text>
		<text x="184" y="232" text-anchor="middle" font-size="16px">Ecosystem</text>
		<text x="296" y="232" text-anchor="middle" font-size="16px">Collaborative</text>
		<text x="296" y="252" text-anchor="middle" font-size="16px">environment</text>
	</svg>
</div>
<div style="width: 60mm; float: right; margin-top: 0;">
	<p>The figure on the left reflects your individual score. The Co-Creation Opportunity Scan measures the performance on three main drivers. These drivers should be balanced in order to be able to fully exploit your co-creation potential.</p>
</div>
<p style="clear: both;">This means that your current co-creation capability is as good as the lowest score on one of the three drivers. (1)</p>
<p>Your co-creation opportunity lies in balancing the three scores. This means that you will have to increase the scores of the lowest drivers towards the score of the highest driver. (2)</p>
<p>After that there is always the potential to increase the scores further to their maximum. (3)</p>
<h2>Main drivers</h2>
<ul>
	<li style="color: #3097fc; margin-bottom: 5mm;">Internal Organisation <span>- This driver is about how well the innovation process is organised in terms of processes and governance, methods and tools, as well as resourcing and skills</span></li>
	<li style="color: #f6871f; margin-bottom: 5mm;">Ecosystem <span>- This driver is about the employees, customers, partners and suppliers you can involve during the innovation process in terms of reach, richness and proximity</span></li>
	<li style="color: #87cc00; margin-bottom: 5mm;">Collaborative environment <span>- This driver is about your capability to create a cooperative setting in terms of incentive and reward mechanisms, communication maturity as well as openness</span></li>
</ul>

<pagebreak>

<div style="clear: both; margin: 0 -20mm; padding: 2mm 20mm 5mm; background-color: #e6e6e6;">
	<h2>Co-creation provides the following benefits</h2>
	<ul style="width: 80mm; float: left; margin-top: -1mm;">
		<li><span>High levels of engagement and participation</span></li>
		<li><span>Fast adoption</span></li>
		<li><span>Better innovations</span></li>
		<li><span>Easy access to expertise</span></li>
	</ul>
	<ul style="width: 80mm; float: right; margin-top: -1mm;">
		<li><span>Balanced utilisation of scarce resources</span></li>
		<li><span>Early detection of failure</span></li>
		<li><span>Fast and effective decision making</span></li>
		<li><span>In-depth insights at minimal cost</span></li>
	</ul>
</div>

<h1>Result details</h1>
<table style="width: 100%; border-collapse: collapse;">
	<tbody>
		<tr class="head">
			<th class="left">Internal Organisation</th>
			<th class="center">' . number_format($organisation*5, 1, '.', ',') . '</th>
			<th class="slider"><span class="ball" style="border-left: ' . (3+($organisation*5-1)*10) . 'mm solid #f3f3f3">&#9679;</span></th>
		</tr>
		<tr class="dark">
			<td>Innovation strategy</td>
			<td class="center">' . number_format($score[0][0], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[0][0]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>
		<tr class="light">
			<td>Processes and governance</td>
			<td class="center">' . number_format($score[1][0], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[1][0]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>
		<tr class="dark">
			<td>Methods and tools</td>
			<td class="center">' . number_format($score[1][1], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[1][1]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>
		<tr class="light">
			<td>Resourcing and skills</td>
			<td class="center">' . number_format($score[1][2], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[1][2]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>

		<tr class="head">
			<th class="left">Ecosystem</th>
			<th class="center">' . number_format($ecosystem*5, 1, '.', ',') . '</th>
			<th class="slider"><span class="ball" style="border-left: ' . (3+($ecosystem*5-1)*10) . 'mm solid #f3f3f3">&#9679;</span></th>
		</tr>
		<tr class="dark">
			<td>Reach</td>
			<td class="center">' . number_format($score[2][0], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[2][0]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>
		<tr class="light">
			<td>Proximity</td>
			<td class="center">' . number_format($score[2][1], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[2][1]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>
		<tr class="dark">
			<td>Richness</td>
			<td class="center">' . number_format($score[2][2], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[2][2]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>

		<tr class="head">
			<th class="left">Collaborative environment</th>
			<th class="center">' . number_format($environment*5, 1, '.', ',') . '</th>
			<th class="slider"><span class="ball" style="border-left: ' . (3+($environment*5-1)*10) . 'mm solid #f3f3f3">&#9679;</span></th>
		</tr>
		<tr class="light">
			<td>Incentive and reward mechanisms</td>
			<td class="center">' . number_format($score[3][0], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[3][0]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>
		<tr class="dark">
			<td>Communication maturity</td>
			<td class="center">' . number_format($score[3][1], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[3][1]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>
		<tr class="light">
			<td>Openness</td>
			<td class="center">' . number_format($score[3][2], 1, '.', ',') . '</td>
			<td class="slider"><span class="ball" style="border-left: ' . (3+($score[3][2]-1)*10) . 'mm solid #f3f3f3">&#9679;</span></td>
		</tr>
	</tbody>
</table>

<h2>Indication of your results</h2>
<p>Survey results are categorized in three areas with different required attention and actions:</p>
<img width="170mm" src="mpdf/results.png">
<br>
<p>If you are interested in further explanation and details, we will be pleased to get in touch with you.</p>

<pagebreak>

<h2>Interested? See also COCOS Team and COCOS Tailored</h2>
<p>The survey can also be taken on a company wide basis. The more answers you get, the better and more valid the results.</p>

<table style="border-collapse: collapse;">
<tbody>
<tr style="text-align: center;">
<td style="width: 15%;">&nbsp;</td>
<td style="width: 40%;">&nbsp;</td>
<td style="width: 15%; background-color: #3097fc; padding: 2mm; text-align: center;">
<h3 style="color: #fff;"><strong>ONE</strong></h3>
</td>
<td style="width: 15%; background-color: #3097fc; padding: 2mm; text-align: center;">
<h3 style="color: #fff;"><strong>TEAM</strong></h3>
</td>
<td style="width: 15%; background-color: #3097fc; padding: 2mm; text-align: center;">
<h3 style="color: #fff;"><strong>TAILORED</strong></h3>
</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td rowspan="2"><strong>Data collection</strong></td>
<td>Online survey (45 questions)</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td>Inverviews (Tailored)</td>
<td style="text-align: center;">-</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td rowspan="2"><strong>Participants</strong></td>
<td>You</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>People you select (min 5)</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td rowspan="5"><strong>Scope</strong></td>
<td>You</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td>Seniority levels</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td>Multiple departments</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td>Multiple countries</td>
<td style="text-align: center;">-</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td>Multiple organisations</td>
<td style="text-align: center;">-</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td rowspan="14"><strong>Reports</strong></td>
<td>Individual score</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Your organisation&rsquo;s score</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Scores per Seniority level</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Scores per department</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Scores per country</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Scores per organisation</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Benchmark: Your score to all industries</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Benchmark: Your score to organisation score</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Benchmark: Your organisation to database</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Benchmark: Your departments benchmarked</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Benchmark: Countries benchmarked</td>
<td style="text-align: center;">-</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Benchmark: Your organisation to best-in-class</td>
<td style="text-align: center;">-</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Tailored benchmarks</td>
<td style="text-align: center;">-</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Co-creation opportunity</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td rowspan="3"><strong>Insights</strong></td>
<td>Outcomes only</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td>High level findings and insights</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td>In-depth analysis</td>
<td style="text-align: center;">-</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td rowspan="4"><strong>Presentation</strong></td>
<td>Online real time display</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>MS Excel (raw data)</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>Powerpoint (PPT)</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr>
<td>In person presentation</td>
<td style="text-align: center;">-</td>
<td style="text-align: center;">-</td>
<td style="color: #3097fc; text-align: center;">✓</td>
</tr>
<tr style="background-color: #e6e6e6;">
<td><strong>Costs</strong></td>
<td>&nbsp;</td>
<td style="font-size: 16px; text-align: center;">Free</td>
<td style="font-size: 16px; text-align: center;">&euro;1500,-</td>
<td style="font-size: 16px; text-align: center;">On request</td>
</tr>
</tbody>
</table>

<pagebreak>

<h2>Additional results</h2>
<p>With the team and tailored version, we will develop a tailor-made report for your organisation. Next to scores on the individual drivers and sub- drivers, you will receive an overview of your whole organisation&rsquo;s score, displayed as below.</p>

<h3>COCOS Team</h3>
<div style="width: 80mm; float: left;">
	<img style="border: 1mm solid #e6e6e6;" src="mpdf/pic1.png">
	<p style="text-align: center; font-size: 12px; font-style: italic;">Detailed results</p>
</div>
<div style="width: 80mm; float: right;">
	<img style="border: 1mm solid #e6e6e6;" src="mpdf/pic2.png">
	<p style="text-align: center; font-size: 12px; font-style: italic;">Opportunity indication</p>
</div>

<h3 style="clear: both;">COCOS Tailored</h3>
<div style="width: 80mm; float: left;">
	<img style="border: 1mm solid #e6e6e6;" src="mpdf/pic3.png">
	<p style="text-align: center; font-size: 12px; font-style: italic;">Benchmark (countries, industries, etc.)</p>
</div>
<div style="width: 80mm; float: right;">
	<img style="border: 1mm solid #e6e6e6;" src="mpdf/pic4.png">
	<p style="text-align: center; font-size: 12px; font-style: italic;">Internal deviation</p>
</div>

<div style="clear: both; margin: 0 -20mm; padding: 2mm 20mm 5mm; background-color: #e6e6e6;">
	<h2 style="clear: both;">Interested?</h2>
	<p>Feel free to contact us any time! <a href="mailto:tom.rijks@innopay.com">tom.rijks@innopay.com</a></p>
</div>

</body></html>';

$mpdf = new mPDF('','', 0, '', 20, 20, 20, 40, 0, 10);
$mpdf->WriteHTML($html);

$mpdf->Output();
exit;
?>