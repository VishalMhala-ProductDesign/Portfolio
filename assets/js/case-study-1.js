// ===== Layout =====
function applyTopOffset() {
  var h = document.getElementById('topband').offsetHeight;
  document.body.style.paddingTop = (h + 24) + 'px';
  document.querySelector('.sidebar-nav').style.top = (h + 24) + 'px';
  document.querySelectorAll('.section').forEach(function(s) {
    s.style.scrollMarginTop = (h + 24) + 'px';
  });
  document.body.style.visibility = 'visible';
}

window.addEventListener('DOMContentLoaded', applyTopOffset);
window.addEventListener('load', applyTopOffset);
window.addEventListener('resize', applyTopOffset);

// ===== Nav =====
function setActive(el) {
  document.querySelectorAll('.nav-button').forEach(function(btn) {
    btn.classList.remove('active');
  });
  el.classList.add('active');
}

// ===== Modals =====
function openDocumentFullScreen()  { document.getElementById('documentModal').classList.add('active'); }
function closeDocumentFullScreen() { document.getElementById('documentModal').classList.remove('active'); }

function openPersonaDocument()  { document.getElementById('personaModal').classList.add('active'); }
function closePersonaDocument() { document.getElementById('personaModal').classList.remove('active'); }

function openIPPsJourney()  { document.getElementById('ippsJourneyModal').classList.add('active'); }
function closeIPPsJourney() { document.getElementById('ippsJourneyModal').classList.remove('active'); }

function openISOJourney()  { document.getElementById('isoJourneyModal').classList.add('active'); }
function closeISOJourney() { document.getElementById('isoJourneyModal').classList.remove('active'); }

function openLSEJourney()  { document.getElementById('lseJourneyModal').classList.add('active'); }
function closeLSEJourney() { document.getElementById('lseJourneyModal').classList.remove('active'); }

function openPendoAnalysis()  { document.getElementById('pendoAnalysisModal').classList.add('active'); }
function closePendoAnalysis() { document.getElementById('pendoAnalysisModal').classList.remove('active'); }

function openPlexosOverview()  { document.getElementById('plexosOverviewModal').classList.add('active'); }
function closePlexosOverview() {
  var modal = document.getElementById('plexosOverviewModal');
  modal.classList.remove('active');
  var video = modal.querySelector('video');
  if (video) { video.pause(); }
}

function openPlexosData()  { document.getElementById('plexosDataModal').classList.add('active'); }
function closePlexosData() {
  var modal = document.getElementById('plexosDataModal');
  modal.classList.remove('active');
  var video = modal.querySelector('video');
  if (video) { video.pause(); }
}

function openPlexosModels()  { document.getElementById('plexosModelsModal').classList.add('active'); }
function closePlexosModels() {
  var modal = document.getElementById('plexosModelsModal');
  modal.classList.remove('active');
  var video = modal.querySelector('video');
  if (video) { video.pause(); }
}

// Close modal on backdrop click
window.onclick = function(event) {
  var modalMap = {
    'documentModal':       closeDocumentFullScreen,
    'personaModal':        closePersonaDocument,
    'ippsJourneyModal':    closeIPPsJourney,
    'isoJourneyModal':     closeISOJourney,
    'lseJourneyModal':     closeLSEJourney,
    'pendoAnalysisModal':  closePendoAnalysis,
    'plexosOverviewModal': closePlexosOverview,
    'plexosDataModal':     closePlexosData,
    'plexosModelsModal':   closePlexosModels,
  };
  for (var id in modalMap) {
    if (event.target === document.getElementById(id)) {
      modalMap[id]();
      break;
    }
  }
};

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeDocumentFullScreen();
    closePersonaDocument();
    closeIPPsJourney();
    closeISOJourney();
    closeLSEJourney();
    closePendoAnalysis();
    closePlexosOverview();
    closePlexosData();
    closePlexosModels();
  }
});

// ===== Carousel =====
function carouselMove(id, dir) {
  var slides  = document.querySelectorAll('#' + id + ' .carousel-slide');
  var dots    = document.querySelectorAll('#' + id + ' .carousel-dot');
  var counter = document.querySelector('#' + id + ' .carousel-counter');
  var current = 0;
  slides.forEach(function(s, i) { if (s.classList.contains('active')) current = i; });
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (current + dir + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
}

function carouselGoTo(id, index) {
  var slides  = document.querySelectorAll('#' + id + ' .carousel-slide');
  var dots    = document.querySelectorAll('#' + id + ' .carousel-dot');
  var counter = document.querySelector('#' + id + ' .carousel-counter');
  slides.forEach(function(s) { s.classList.remove('active'); });
  dots.forEach(function(d) { d.classList.remove('active'); });
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  if (counter) counter.textContent = (index + 1) + ' / ' + slides.length;
}

// ===== IPPs Journey Carousel =====
var ippsCurrentStep = 0;
var ippsData = [
  {
    title: 'Gather Input &amp; Prepare | Collect plant, fuel, and price data',
    rt: {
      goal:      'Maximize real-time revenue from generation assets<br>Ensure units are available and operating within constraints<br>Manage exposure to real-time price and imbalance risk',
      actions:   'Collect real-time data (plant status, outages, generation availability)<br>Monitor market prices (LMP) and dispatch signals from ISO<br>Track actual vs scheduled generation and deviations',
      thoughts:  '&ldquo;Are my units running optimally right now?&rdquo;<br>&ldquo;Am I capturing the best price opportunities?&rdquo;<br>&ldquo;Do I have any imbalance or penalty risk?&rdquo;',
      painpoint: 'Sudden outages or performance limitations<br>Volatile real-time prices<br>Limited control over dispatch decisions (ISO-driven)',
      emotions:  'Alert to capture price spikes<br>Stress during outages or price drops<br>Satisfaction when assets perform profitably',
      tool:      'SCADA / plant monitoring systems<br>Real-time market dashboards (LMP, dispatch)<br>PLEXOS / dispatch tracking tools',
      ai:        'Need to add'
    },
    da: {
      goal:      'Optimize bidding strategy to maximize revenue<br>Forecast prices and position assets competitively<br>Plan asset utilization and investment decisions',
      actions:   'Gather inputs (fuel cost, plant efficiency, outage schedules, market forecasts)<br>Analyse historical and forecasted price trends<br>Prepare bids/offers for DAM based on expected profitability',
      thoughts:  '&ldquo;What price should I bid to maximize profit?&rdquo;<br>&ldquo;How will market conditions impact my revenue?&rdquo;<br>&ldquo;Are my assets competitive in this market?&rdquo;',
      painpoint: 'Uncertainty in price forecasts and market behaviour<br>Competition from other generators and renewables<br>Fuel price volatility impacting margins',
      emotions:  'Analytical when preparing bids<br>Uncertain about market outcomes<br>Confident when strategy is well-aligned with forecasts',
      tool:      'PLEXOS (bidding strategy &amp; price forecasting)<br>Market data platforms (prices, demand, competitors)<br>Fuel and cost modelling tools',
      ai:        'Need to add'
    }
  },
  {
    title: 'Simulation Setting | Configure bidding &amp; asset models',
    rt: {
      goal:      'Configure short-term model to optimize real-time dispatch and revenue<br>Reflect current plant availability, constraints, and market conditions<br>Generate outputs to track performance and imbalance risk',
      actions:   'Set short-term horizon (intra-hour / hourly) and resolution<br>Input real-time data (unit availability, outages, fuel limits, dispatch signals)<br>Select outputs (price, dispatch, generation, imbalance, revenue impact)',
      thoughts:  '&ldquo;Is the model capturing current plant constraints correctly?&rdquo;<br>&ldquo;Will outputs reflect actual dispatch and price signals?&rdquo;<br>&ldquo;Am I capturing revenue and risk accurately?&rdquo;',
      painpoint: 'Incorrect assumptions lead to wrong dispatch signals<br>Limited visibility into market-wide conditions<br>Too many outputs make it hard to focus on key revenue drivers',
      emotions:  'Careful while configuring high-impact runs<br>Pressure to align model with real-time conditions<br>Confidence when setup reflects actual operations',
      tool:      'PLEXOS short-term dispatch / simulation<br>SCADA / plant monitoring systems<br>Real-time market dashboards (LMP, dispatch signals)',
      ai:        'Need to add'
    },
    da: {
      goal:      'Configure model for optimal bidding strategy and revenue maximization<br>Reflect asset characteristics, fuel costs, and market conditions<br>Generate outputs for price forecast, dispatch, and profitability',
      actions:   'Define horizon (day-ahead, week-ahead) and scenario assumptions<br>Input bids/offers, fuel costs, plant constraints, and market forecasts<br>Select outputs (price forecast, unit commitment, revenue, utilization)',
      thoughts:  '&ldquo;Are my cost assumptions and bids realistic?&rdquo;<br>&ldquo;Will this model reflect competitive market behaviour?&rdquo;<br>&ldquo;Can I rely on this for bidding decisions?&rdquo;',
      painpoint: 'Complexity in modelling bidding strategies and market response<br>Uncertainty in price forecasts and competitor behaviour<br>Difficulty aligning model with actual market outcomes',
      emotions:  'Analytical while setting up model<br>Uncertain about market assumptions<br>Confident when setup supports clear bidding strategy',
      tool:      'PLEXOS (bidding strategy &amp; market simulation)<br>Market data platforms (prices, demand, competitors)<br>Fuel cost and asset performance models',
      ai:        'Need to add'
    }
  },
  {
    title: 'Execute Back Cast Model &amp; RUN | Validate price, dispatch &amp; revenue vs history',
    rt: {
      goal:      'Validate how assets performed under past real-time market conditions<br>Check dispatch accuracy and imbalance exposure<br>Improve confidence in short-term operational strategies',
      actions:   'Load historical data (prices, dispatch, outages, generation output)<br>Run back cast for selected periods (peak hours, price spikes)<br>Compare simulated vs actual generation, dispatch, and revenue',
      thoughts:  '&ldquo;Did my assets perform as expected historically?&rdquo;<br>&ldquo;Where did I lose revenue or face imbalance penalties?&rdquo;<br>&ldquo;Can I trust this model for real-time decisions?&rdquo;',
      painpoint: 'Incomplete or inconsistent historical plant data<br>Difficulty capturing real-time price volatility<br>Hard to isolate performance issues (asset vs market vs model)',
      emotions:  'Focused during performance validation<br>Frustrated when results deviate from actual outcomes<br>Confident when model aligns with historical behaviour',
      tool:      'PLEXOS back casting / dispatch simulation<br>Historical plant and market data (prices, dispatch)<br>SCADA / plant performance data',
      ai:        'Need to add'
    },
    da: {
      goal:      'Validate price forecasts and bidding strategies against historical outcomes<br>Benchmark revenue and asset utilization performance<br>Build a reliable base model for future bidding and planning',
      actions:   'Run back cast using historical prices, demand, fuel cost, and constraints<br>Compare simulated vs actual DAM results (price, dispatch, revenue)<br>Adjust assumptions and rerun to improve alignment',
      thoughts:  '&ldquo;Is my price forecast close to actual market outcomes?&rdquo;<br>&ldquo;Did my bidding strategy capture available revenue?&rdquo;<br>&ldquo;Is this model reliable for future decisions?&rdquo;',
      painpoint: 'Difficulty capturing competitor behaviour and market dynamics<br>Gaps between modelled and actual price outcomes<br>Need high accuracy for revenue forecasting',
      emotions:  'Analytical while benchmarking performance<br>Uncertain when results diverge<br>Confident when model reflects real market behaviour',
      tool:      'PLEXOS market simulation / back casting<br>Historical market data (prices, demand, bids if available)<br>Excel / analytics tools for revenue comparison',
      ai:        'Need to add'
    }
  },
  {
    title: 'Analyse Solution | Analyse profit drivers and asset performance',
    rt: {
      goal:      'Evaluate real-time asset performance and revenue outcomes<br>Identify imbalance exposure and dispatch efficiency<br>Ensure assets are operating at optimal levels',
      actions:   'Analyse outputs (generation, dispatch, LMP, imbalance, revenue)<br>Compare expected vs actual plant performance<br>Identify inefficiencies or missed revenue opportunities',
      thoughts:  '&ldquo;Am I generating at the most profitable times?&rdquo;<br>&ldquo;Did I miss any high-price opportunities?&rdquo;<br>&ldquo;Is my plant operating efficiently?&rdquo;',
      painpoint: 'Limited control over dispatch (ISO-driven decisions)<br>Difficulty linking price signals to asset performance<br>Rapid price fluctuations affecting revenue',
      emotions:  'Alert when analysing price and dispatch signals<br>Frustration when revenue opportunities are missed<br>Satisfaction when assets perform optimally',
      tool:      'PLEXOS output analysis tools<br>Real-time market dashboards (LMP, dispatch)<br>SCADA / plant performance monitoring systems',
      ai:        'Need to add'
    },
    da: {
      goal:      'Evaluate profitability of bidding strategies and scenarios<br>Understand key drivers of revenue (price, cost, utilization)<br>Support decisions on asset utilization and investment',
      actions:   'Analyse outputs (price forecast, unit commitment, revenue, utilization)<br>Compare performance across different scenarios<br>Identify drivers of profit and risk exposure',
      thoughts:  '&ldquo;Which scenario maximizes my revenue?&rdquo;<br>&ldquo;What factors are impacting my margins?&rdquo;<br>&ldquo;Are my assets competitive in this market?&rdquo;',
      painpoint: 'Complexity in interpreting price vs cost vs dispatch<br>Uncertainty in future market conditions<br>Difficulty benchmarking against competitors',
      emotions:  'Analytical while evaluating results<br>Uncertain when results vary across scenarios<br>Confident when clear profit drivers are identified',
      tool:      'PLEXOS output &amp; scenario analysis<br>Excel / BI tools for revenue and cost analysis<br>Market data platforms (prices, demand, competitors)',
      ai:        'Need to add'
    }
  },
  {
    title: 'Forecast/Base Model &amp; Run | Forecast prices and revenue opportunities',
    rt: {
      goal:      'Predict short-term price movements and dispatch opportunities<br>Anticipate imbalance risks and optimize real-time generation<br>Maximize revenue from near-term market conditions',
      actions:   'Run short-term forecasts using latest price, load, and outage data<br>Update base model with current plant constraints and system conditions<br>Generate outputs (price forecast, dispatch, imbalance exposure, revenue)',
      thoughts:  '&ldquo;Will prices increase in the next few hours?&rdquo;<br>&ldquo;Should I adjust generation to capture higher revenue?&rdquo;<br>&ldquo;Am I exposed to imbalance penalties?&rdquo;',
      painpoint: 'High volatility in real-time prices<br>Limited control over dispatch decisions (ISO-driven)<br>Forecast errors impacting revenue opportunities',
      emotions:  'Alert to capture price spikes<br>Uncertain due to market volatility<br>Confident when forecasts align with trends',
      tool:      'PLEXOS short-term forecasting / dispatch models<br>Real-time market data feeds (LMP, demand)<br>SCADA / plant monitoring systems',
      ai:        'Need to add'
    },
    da: {
      goal:      'Forecast prices and market conditions to maximize bidding revenue<br>Position assets competitively in the day-ahead market<br>Support investment, hedging, and portfolio planning decisions',
      actions:   'Run base model using forecasted demand, fuel cost, outages, and constraints<br>Generate price forecasts, unit commitment, and revenue projections<br>Evaluate multiple assumptions (demand, renewables, fuel, competition)',
      thoughts:  '&ldquo;What price should I bid tomorrow?&rdquo;<br>&ldquo;How will market conditions affect my revenue?&rdquo;<br>&ldquo;Are my assets competitive under these forecasts?&rdquo;',
      painpoint: 'Uncertainty in price forecasts and competitor behaviour<br>Fuel cost variability impacting margins<br>Difficulty predicting market clearing outcomes',
      emotions:  'Analytical during forecasting<br>Uncertain due to market unpredictability<br>Confident when forecasts support strong strategy',
      tool:      'PLEXOS (price forecasting &amp; market simulation)<br>Market data platforms (prices, demand, competitors)<br>Fuel cost and asset performance models',
      ai:        'Need to add'
    }
  },
  {
    title: 'Forecast/Base Model + Scenario-A,,, &amp; RUN | Test profit vs risk across scenarios',
    rt: {
      goal:      'Evaluate short-term revenue opportunities under different market conditions<br>Identify risk scenarios (low prices, outages, imbalance penalties)<br>Prepare optimal real-time response strategies',
      actions:   'Create scenarios (price spike, demand surge, outage, renewable drop)<br>Run simulations with updated plant constraints and system conditions<br>Compare outputs (price, dispatch, revenue, imbalance exposure)',
      thoughts:  '&ldquo;Which scenario gives me the highest revenue?&rdquo;<br>&ldquo;What is my downside risk if prices fall?&rdquo;<br>&ldquo;Should I adjust generation strategy now?&rdquo;',
      painpoint: 'High volatility makes scenario outcomes unpredictable<br>Limited control over dispatch decisions<br>Difficulty identifying most critical scenarios quickly',
      emotions:  'Alert while evaluating revenue opportunities<br>Pressure due to rapid market changes<br>Confidence when optimal strategy is identified',
      tool:      'PLEXOS short-term scenario simulation<br>Real-time market dashboards (LMP, dispatch)<br>SCADA / plant monitoring systems',
      ai:        'Need to add'
    },
    da: {
      goal:      'Identify optimal bidding strategy across multiple scenarios<br>Understand revenue sensitivity to market conditions<br>Reduce risk while maximizing expected profit',
      actions:   'Define scenarios (high/low demand, fuel cost changes, renewable variability, competition)<br>Run simulations to generate price, dispatch, and revenue outcomes<br>Evaluate results to identify best bidding and hedging strategy',
      thoughts:  '&ldquo;Which scenario gives the best risk-adjusted return?&rdquo;<br>&ldquo;How sensitive is my revenue to price and fuel changes?&rdquo;<br>&ldquo;What is the safest yet profitable bidding strategy?&rdquo;',
      painpoint: 'Managing and interpreting multiple scenarios<br>Uncertainty in competitor behaviour and market dynamics<br>Difficulty balancing risk vs reward',
      emotions:  'Analytical during scenario evaluation<br>Uncertain when results vary widely<br>Confident when clear strategy emerges',
      tool:      'PLEXOS scenario modelling &amp; simulation<br>Market data platforms (prices, demand, competitors)<br>Fuel cost and financial risk modelling tools',
      ai:        'Need to add'
    }
  },
  {
    title: 'Compare Scenarios | Select highest risk adjusted return strategy',
    rt: {
      goal:      'Identify scenario with highest short-term revenue potential<br>Evaluate downside risk (low prices, imbalance penalties)<br>Select best operational strategy for immediate execution',
      actions:   'Compare outputs (price, dispatch, generation, revenue, imbalance)<br>Identify best-case vs worst-case revenue scenarios<br>Select optimal generation and dispatch approach',
      thoughts:  '&ldquo;Which scenario gives me the most profit right now?&rdquo;<br>&ldquo;What is my downside risk if prices fall?&rdquo;<br>&ldquo;Should I change generation strategy immediately?&rdquo;',
      painpoint: 'High volatility makes comparison difficult<br>Limited control over final dispatch (ISO-driven)<br>Small price differences can significantly impact revenue',
      emotions:  'Alert while evaluating opportunities<br>Pressure to react quickly to market signals<br>Confidence when best revenue scenario is clear',
      tool:      'PLEXOS scenario comparison outputs<br>Real-time market dashboards (LMP, dispatch)<br>SCADA / plant performance systems',
      ai:        'Need to add'
    },
    da: {
      goal:      'Identify optimal bidding strategy across multiple scenarios<br>Balance expected profit with risk exposure<br>Support investment and hedging decisions',
      actions:   'Compare outputs (price forecast, unit commitment, revenue, utilization)<br>Analyse sensitivity across demand, fuel, renewable, and competition scenarios<br>Select best strategy for DAM bidding and portfolio positioning',
      thoughts:  '&ldquo;Which scenario gives the best risk-adjusted return?&rdquo;<br>&ldquo;How sensitive is my revenue to key assumptions?&rdquo;<br>&ldquo;Which strategy is safest yet profitable?&rdquo;',
      painpoint: 'Managing multiple scenarios and interpreting results<br>Uncertainty in competitor behaviour and market outcomes<br>Difficulty balancing profit vs risk',
      emotions:  'Analytical during comparison<br>Uncertain when scenarios conflict<br>Confidence when optimal strategy emerges',
      tool:      'PLEXOS scenario comparison &amp; reporting<br>Excel / BI dashboards for revenue comparison<br>Market data platforms (prices, demand, competitors)',
      ai:        'Need to add'
    }
  },
  {
    title: 'Results | Execute bids and realize revenue',
    rt: {
      goal:      'Maximize realized revenue from real-time operations<br>Ensure assets operate within limits while minimizing imbalance penalties<br>Respond effectively to real-time market conditions',
      actions:   'Monitor actual dispatch, generation, price, and imbalance outcomes<br>Adjust generation based on real-time price signals and system conditions<br>Track revenue performance and penalty exposure',
      thoughts:  '&ldquo;Did I capture the best available price?&rdquo;<br>&ldquo;Am I incurring any imbalance penalties?&rdquo;<br>&ldquo;Do I need to adjust operations immediately?&rdquo;',
      painpoint: 'Limited control over dispatch decisions (ISO-driven)<br>Price volatility impacting realized revenue<br>Difficulty linking outcomes to prior decisions',
      emotions:  'Satisfaction when high prices are captured<br>Stress during low-price or high-penalty periods<br>Confidence when operations perform as expected',
      tool:      'SCADA / plant monitoring systems<br>Real-time market dashboards (LMP, dispatch)<br>Performance tracking and revenue dashboards',
      ai:        'Need to add'
    },
    da: {
      goal:      'Deliver final bidding outcomes and maximize revenue realization<br>Evaluate profitability of strategy and improve future decisions<br>Support long-term investment and hedging strategies',
      actions:   'Submit bids/offers and review market clearing results (price, dispatch)<br>Analyse revenue, utilization, and asset performance outcomes<br>Feed results into future strategy, forecasting, and portfolio planning',
      thoughts:  '&ldquo;Did my bidding strategy maximize profit?&rdquo;<br>&ldquo;How did actual results compare to forecasts?&rdquo;<br>&ldquo;What should I improve for the next cycle?&rdquo;',
      painpoint: 'Gap between forecasted and actual market outcomes<br>Competitive market dynamics reducing expected margins<br>Need to justify performance internally',
      emotions:  'Satisfaction when strategy performs well<br>Pressure from revenue expectations<br>Confidence when results are consistent and explainable',
      tool:      'PLEXOS output and reporting tools<br>Market Management Systems (DAM results)<br>BI / analytics dashboards for revenue and performance',
      ai:        'Need to add'
    }
  }
];

function ippsCarouselRender(index) {
  var d = ippsData[index];
  document.getElementById('ippsStepTitle').innerHTML     = d.title;
  document.getElementById('ippsStepTitleDA').innerHTML  = d.title;
  document.getElementById('ipp-rt-goal').innerHTML      = d.rt.goal;
  document.getElementById('ipp-rt-actions').innerHTML   = d.rt.actions;
  document.getElementById('ipp-rt-thoughts').innerHTML  = d.rt.thoughts;
  document.getElementById('ipp-rt-painpoint').innerHTML = d.rt.painpoint;
  document.getElementById('ipp-rt-emotions').innerHTML  = d.rt.emotions;
  document.getElementById('ipp-rt-tool').innerHTML      = d.rt.tool;
  document.getElementById('ipp-da-goal').innerHTML      = d.da.goal;
  document.getElementById('ipp-da-actions').innerHTML   = d.da.actions;
  document.getElementById('ipp-da-thoughts').innerHTML  = d.da.thoughts;
  document.getElementById('ipp-da-painpoint').innerHTML = d.da.painpoint;
  document.getElementById('ipp-da-emotions').innerHTML  = d.da.emotions;
  document.getElementById('ipp-da-tool').innerHTML      = d.da.tool;
  document.getElementById('ipp-rt-ai').innerHTML        = d.rt.ai;
  document.getElementById('ipp-da-ai').innerHTML        = d.da.ai;
  document.querySelectorAll('#ippsCarouselDots .carousel-dot').forEach(function(btn, i) {
    btn.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.ipps-step-indicator').forEach(function(el) {
    el.textContent = (index + 1) + ' / ' + ippsData.length;
  });
  ippsCurrentStep = index;
}

function ippsCarouselMove(dir) {
  ippsCarouselRender((ippsCurrentStep + dir + ippsData.length) % ippsData.length);
}

function ippsCarouselGoTo(index) {
  ippsCarouselRender(index);
}

window.addEventListener('DOMContentLoaded', function() { ippsCarouselRender(0); });

// ===== ISO Journey Carousel =====
var isoCurrentStep = 0;
var isoData = [
  {
    title: 'Gather Input &amp; Prepare | Collect system, bids, and grid state data',
    rt: {
      goal:      'Maintain real-time system balance (supply = demand)<br>Ensure grid reliability and manage congestion<br>Detect and respond to deviations quickly',
      actions:   'Collect real-time data (load, generation, outages, transmission flows)<br>Monitor system conditions (frequency, congestion, reserves)<br>Validate actual vs forecast and identify deviations',
      thoughts:  '&ldquo;Is the system balanced right now?&rdquo;<br>&ldquo;Are there any congestion or reliability risks?&rdquo;<br>&ldquo;Do we need immediate intervention?&rdquo;',
      painpoint: 'Incomplete or delayed real-time system data<br>Sudden outages or renewable variability<br>Managing multiple constraints simultaneously',
      emotions:  'High alert during system fluctuations<br>Pressure to maintain stability continuously<br>Relief when grid is balanced and stable',
      tool:      'SCADA / EMS systems (grid monitoring)<br>Real-time market systems (RTM platforms)<br>PLEXOS / simulation tools for validation',
      ai:        '<strong>Where AI Helps:</strong> Real-time data validation<br><br><strong>Example AI Capability:</strong><br>AI detects abnormal grid data / missing bids'
    },
    da: {
      goal:      'Prepare accurate inputs for day-ahead market clearing<br>Ensure system reliability under forecasted conditions<br>Support efficient and fair market operation',
      actions:   'Gather forecasts (load, renewables, outages, transmission constraints)<br>Validate bids/offers from generators and demand participants<br>Prepare inputs for market clearing simulation (DAM)',
      thoughts:  '&ldquo;Are forecasts realistic and complete?&rdquo;<br>&ldquo;Do bids/offers reflect actual system capability?&rdquo;<br>&ldquo;Will the system remain reliable under this plan?&rdquo;',
      painpoint: 'Forecast uncertainty (load, wind, solar)<br>Inconsistent or strategic bidding behaviour<br>Complexity of modelling congestion and constraints',
      emotions:  'Analytical during preparation phase<br>Concern about forecast accuracy<br>Confidence when inputs are validated',
      tool:      'Market management systems (DAM platforms)<br>Forecasting tools (load, renewable, outages)<br>PLEXOS / market simulation tools',
      ai:        '<strong>Where AI Helps:</strong> Real-time data validation<br><br><strong>Example AI Capability:</strong><br>AI detects abnormal grid data / missing bids'
    }
  },
  {
    title: 'Simulation Setting | Configure market clearing &amp; constraints',
    rt: {
      goal:      'Configure real-time dispatch model reflecting actual system conditions<br>Ensure constraints (transmission, reserves, outages) are accurately represented<br>Generate outputs to support immediate balancing and reliability actions',
      actions:   'Set short-term horizon (intra-hour / hourly) and resolution<br>Apply real-time inputs (load, generation, outages, transmission limits, reserves)<br>Select outputs (LMP, dispatch, congestion, reserve activation, imbalance)',
      thoughts:  '&ldquo;Are all real-time constraints correctly captured?&rdquo;<br>&ldquo;Is the model granular enough for current operations?&rdquo;<br>&ldquo;Will outputs reflect actual system behaviour?&rdquo;',
      painpoint: 'Incorrect horizon or resolution reduces usefulness of results<br>Missing constraints can lead to unrealistic dispatch outcomes<br>Too many outputs make it hard to focus on critical signals',
      emotions:  'Careful while configuring high-impact real-time runs<br>Pressure due to time-sensitive decisions<br>Confidence when setup reflects actual grid conditions',
      tool:      'PLEXOS / real-time dispatch simulation<br>SCADA / EMS inputs (grid state, outages, flows)<br>RTM (Real-Time Market) systems',
      ai:        '<strong>Where AI Helps:</strong> Constraint validation<br><br><strong>Example AI Capability:</strong><br>AI flags missing constraints or unrealistic limits'
    },
    da: {
      goal:      'Configure market clearing simulation for DAM and forward planning<br>Incorporate all bids/offers and system constraints accurately<br>Generate outputs for efficient, reliable market outcomes',
      actions:   'Define horizon (day-ahead, week-ahead) and time resolution<br>Input bids/offers, demand forecasts, outages, and transmission constraints<br>Select outputs (LMP, unit commitment, congestion, reserve margins)',
      thoughts:  '&ldquo;Is the market model capturing all constraints correctly?&rdquo;<br>&ldquo;Are bids/offers aligned with system capability?&rdquo;<br>&ldquo;Will this produce a reliable and efficient market outcome?&rdquo;',
      painpoint: 'Complexity of integrating bids, constraints, and forecasts<br>Risk of incorrect assumptions impacting market outcomes<br>Difficulty ensuring model reflects real-world system behaviour',
      emotions:  'Analytical during setup of market model<br>Concern about correctness of assumptions<br>Confidence when model setup is validated',
      tool:      'PLEXOS market simulation (DAM / forward runs)<br>Market Management Systems (bids/offers handling)<br>Forecasting &amp; constraint modelling tools',
      ai:        '<strong>Where AI Helps:</strong> Constraint validation<br><br><strong>Example AI Capability:</strong><br>AI flags missing constraints or unrealistic limits'
    }
  },
  {
    title: 'Execute Back Cast Model &amp; RUN | Validate market behaviour vs history',
    rt: {
      goal:      'Reproduce historical system conditions to validate real-time dispatch behaviour<br>Verify congestion, imbalance, and reserve activation patterns<br>Improve confidence in real-time operational models',
      actions:   'Load historical data (load, generation, outages, transmission flows, prices)<br>Run back cast for selected time periods (critical events, peak hours)<br>Compare simulated vs actual outcomes (dispatch, congestion, imbalance)',
      thoughts:  '&ldquo;Does the model replicate actual system behaviour?&rdquo;<br>&ldquo;Where are the deviations between model and reality?&rdquo;<br>&ldquo;Can this model be trusted for real-time operations?&rdquo;',
      painpoint: 'Historical data gaps or inconsistencies<br>Difficult to capture real-time events (outages, congestion spikes)<br>Hard to isolate root cause of mismatch (data vs model vs constraints)',
      emotions:  'Focused during validation of critical periods<br>Frustrated when model deviates from actual behaviour<br>Confident when outputs match historical outcomes',
      tool:      'PLEXOS back casting / real-time simulation<br>SCADA / EMS / RTM historical data<br>Market and congestion history datasets',
      ai:        '<strong>Where AI Helps:</strong> Market pattern learning<br><br><strong>Example AI Capability:</strong><br>AI learns price/congestion patterns and detects deviations'
    },
    da: {
      goal:      'Validate market clearing logic against historical DAM outcomes<br>Ensure model correctly captures price formation and congestion<br>Build a reliable benchmark for future simulations and market design',
      actions:   'Run back cast using historical bids/offers, demand, and constraints<br>Compare simulated vs actual DAM results (LMP, unit commitment, congestion)<br>Adjust model assumptions and rerun until alignment is achieved',
      thoughts:  '&ldquo;Is the market model producing realistic prices and dispatch?&rdquo;<br>&ldquo;Are congestion and constraints captured correctly?&rdquo;<br>&ldquo;Is this accurate enough for future market simulations?&rdquo;',
      painpoint: 'Complexity of modelling bids/offers and market behaviour<br>Difficulty capturing strategic participant behaviour<br>Need high accuracy for regulatory and market validation',
      emotions:  'Analytical while benchmarking model vs actual<br>Concern when results diverge significantly<br>Confidence when model aligns with historical market outcomes',
      tool:      'PLEXOS market back casting / DAM simulation<br>Historical market data (bids/offers, prices, demand)<br>Data pipelines and validation tools',
      ai:        '<strong>Where AI Helps:</strong> Market pattern learning<br><br><strong>Example AI Capability:</strong><br>AI learns price/congestion patterns and detects deviations'
    }
  },
  {
    title: 'Analyse Solution | Analyse reliability, congestion, and prices',
    rt: {
      goal:      'Evaluate system performance under current operating conditions<br>Identify congestion, imbalance, and reliability risks<br>Ensure dispatch and reserves are maintaining system stability',
      actions:   'Analyse outputs (frequency, dispatch, reserves, congestion, imbalance)<br>Compare expected vs actual system behaviour<br>Flag issues and trigger corrective operational actions',
      thoughts:  '&ldquo;Is the system operating within safe limits?&rdquo;<br>&ldquo;Are there any emerging congestion or imbalance risks?&rdquo;<br>&ldquo;Do we need immediate intervention?&rdquo;',
      painpoint: 'High volume of outputs makes analysis difficult<br>Real-time issues evolve quickly and are hard to track<br>Linking results directly to root causes is challenging',
      emotions:  'Alert while monitoring system performance<br>Pressure to identify and act on risks quickly<br>Relief when system remains stable',
      tool:      'SCADA / EMS visualization systems<br>Real-time market monitoring dashboards<br>PLEXOS output analysis tools',
      ai:        '<strong>Where AI Helps:</strong> Root cause analysis<br><br><strong>Example AI Capability:</strong><br>&ldquo;Congestion driven by Line X overload + wind drop&rdquo;'
    },
    da: {
      goal:      'Evaluate market clearing results (prices, dispatch, congestion)<br>Assess system reliability and adequacy under forecasted conditions<br>Identify inefficiencies or risks in market outcomes',
      actions:   'Analyse outputs (LMP, unit commitment, congestion, reserve margins)<br>Evaluate impact of constraints on price and dispatch<br>Identify trends, anomalies, and system bottlenecks',
      thoughts:  '&ldquo;Are prices and dispatch reflecting true system conditions?&rdquo;<br>&ldquo;Where are the major congestion points?&rdquo;<br>&ldquo;Is the system reliable under this plan?&rdquo;',
      painpoint: 'Complex relationship between constraints, prices, and dispatch<br>Difficulty interpreting congestion and price signals<br>Need to validate results for regulatory and market fairness',
      emotions:  'Analytical while reviewing system and market outcomes<br>Uncertainty when results are complex or unclear<br>Confidence when patterns and drivers are understood',
      tool:      'PLEXOS output reports &amp; congestion analysis tools<br>Market analytics dashboards<br>BI / visualization tools for trend analysis',
      ai:        '<strong>Where AI Helps:</strong> Root cause analysis<br><br><strong>Example AI Capability:</strong><br>&ldquo;Congestion driven by Line X overload + wind drop&rdquo;'
    }
  },
  {
    title: 'Forecast/Base Model &amp; Run | Forecast system conditions &amp; market outcomes',
    rt: {
      goal:      'Anticipate near-term system conditions (load, congestion, reserves)<br>Predict potential imbalances and reliability risks<br>Support proactive interventions before real-time deviations occur',
      actions:   'Run short-term forecasts using updated load, renewable, and outage inputs<br>Update base model with current system constraints and network conditions<br>Generate forward outputs (dispatch, congestion risk, reserve requirements)',
      thoughts:  '&ldquo;What will system conditions look like in the next few hours?&rdquo;<br>&ldquo;Are there any upcoming congestion or reliability risks?&rdquo;<br>&ldquo;Do we need preventive actions before imbalance occurs?&rdquo;',
      painpoint: 'Forecast uncertainty due to renewable variability<br>Rapidly changing system conditions reduce prediction accuracy<br>Limited visibility into unexpected outages',
      emotions:  'Alert while anticipating near-term risks<br>Uncertain due to forecast variability<br>Confident when predictions align with trends',
      tool:      'PLEXOS short-term forecasting / dispatch models<br>SCADA / EMS real-time inputs<br>Weather and renewable forecast systems',
      ai:        '<strong>Where AI Helps:</strong> Risk forecasting<br><br><strong>Example AI Capability:</strong><br>AI predicts congestion hotspots and reserve shortages'
    },
    da: {
      goal:      'Forecast system conditions for day-ahead market clearing<br>Ensure reliability and efficient price formation<br>Support market design and policy evaluation',
      actions:   'Run base model using forecasted demand, bids/offers, outages, and constraints<br>Generate outputs (LMP, unit commitment, congestion, reserve margins)<br>Produce forecasts for multiple conditions (demand, renewables, fuel mix)',
      thoughts:  '&ldquo;Will this forecast lead to efficient and reliable market outcomes?&rdquo;<br>&ldquo;Are price signals reflecting system constraints correctly?&rdquo;<br>&ldquo;Is the system secure under these predicted conditions?&rdquo;',
      painpoint: 'High uncertainty in demand and renewable forecasts<br>Complexity in modelling bids, constraints, and congestion together<br>Ensuring forecasts are accurate enough for market clearing',
      emotions:  'Analytical while reviewing forecast outputs<br>Concern about uncertainty in assumptions<br>Confidence when model outputs are consistent',
      tool:      'PLEXOS market forecasting &amp; simulation<br>Market Management Systems (DAM inputs)<br>Forecasting tools (load, renewable, outages, constraints)',
      ai:        '<strong>Where AI Helps:</strong> Risk forecasting<br><br><strong>Example AI Capability:</strong><br>AI predicts congestion hotspots and reserve shortages'
    }
  },
  {
    title: 'Forecast/Base Model + Scenario-A,,, &amp; Run | Test system stress &amp; market scenarios',
    rt: {
      goal:      'Evaluate system behaviour under multiple short-term risk scenarios<br>Identify potential reliability issues before they occur<br>Prepare contingency actions for real-time operations',
      actions:   'Create short-term scenarios (load spike, outage event, low renewable output)<br>Run simulations using updated system conditions and constraints<br>Compare outputs (congestion, reserves, imbalance risk) across scenarios',
      thoughts:  '&ldquo;What happens if system conditions suddenly worsen?&rdquo;<br>&ldquo;Which scenario poses the highest reliability risk?&rdquo;<br>&ldquo;Do we have a contingency plan ready?&rdquo;',
      painpoint: 'Limited time to create and evaluate multiple scenarios<br>Difficulty identifying most critical risk scenarios<br>High variability in results across scenarios',
      emotions:  'Alert while preparing for uncertainty<br>Pressure to evaluate risks quickly<br>Confidence when contingency plans are clear',
      tool:      'PLEXOS short-term scenario simulation<br>SCADA / EMS inputs (real-time system state)<br>Real-time monitoring and forecasting tools',
      ai:        '<strong>Where AI Helps:</strong> Stress scenario generation<br><br><strong>Example AI Capability:</strong><br>AI simulates extreme events (outages, demand spikes)'
    },
    da: {
      goal:      'Test market outcomes under multiple future scenarios<br>Evaluate system reliability and congestion under uncertainty<br>Support market design, policy, and planning decisions',
      actions:   'Define scenarios (demand variation, renewable variability, outages, policy changes)<br>Run simulations with bids/offers, constraints, and network conditions<br>Generate outputs (LMP, congestion, unit commitment, reserve margins)',
      thoughts:  '&ldquo;How will the system behave under different future conditions?&rdquo;<br>&ldquo;Are there scenarios where reliability is at risk?&rdquo;<br>&ldquo;Do market outcomes remain efficient across scenarios?&rdquo;',
      painpoint: 'Managing large number of complex scenarios<br>Difficulty interpreting impact of constraints across scenarios<br>Ensuring scenario realism and completeness',
      emotions:  'Analytical while evaluating system behaviour<br>Uncertainty when scenarios diverge significantly<br>Confidence when consistent patterns emerge',
      tool:      'PLEXOS scenario modelling &amp; simulation<br>Market Management Systems (DAM + planning inputs)<br>Forecasting, policy, and constraint modelling tools',
      ai:        '<strong>Where AI Helps:</strong> Stress scenario generation<br><br><strong>Example AI Capability:</strong><br>AI simulates extreme events (outages, demand spikes)'
    }
  },
  {
    title: 'Compare Scenarios | Select most stable &amp; efficient system outcome',
    rt: {
      goal:      'Identify scenario with lowest reliability risk for immediate operation<br>Compare system stress across different short-term conditions<br>Select best contingency plan to maintain system balance',
      actions:   'Compare scenario outputs (congestion, reserves, imbalance, frequency risk)<br>Identify worst-case vs most stable system conditions<br>Select and prepare corrective or preventive operational actions',
      thoughts:  '&ldquo;Which scenario puts the system at highest risk?&rdquo;<br>&ldquo;Are we prepared for worst-case conditions?&rdquo;<br>&ldquo;Which scenario should guide immediate action?&rdquo;',
      painpoint: 'Limited time to evaluate multiple scenarios<br>Small differences can significantly impact reliability<br>Difficulty prioritizing critical risk scenarios',
      emotions:  'High alert while assessing system risk<br>Pressure to make fast, accurate decisions<br>Confidence when a clear safe scenario is identified',
      tool:      'PLEXOS scenario comparison outputs<br>SCADA / EMS real-time visualization<br>Reliability and congestion monitoring dashboards',
      ai:        '<strong>Where AI Helps:</strong> Risk ranking<br><br><strong>Example AI Capability:</strong><br>AI ranks scenarios: &ldquo;Scenario B has highest reliability risk&rdquo;'
    },
    da: {
      goal:      'Identify scenario that ensures reliable and efficient market outcomes<br>Compare trade-offs between congestion, cost, and reliability<br>Support market design, policy, and planning decisions',
      actions:   'Compare outputs (LMP, congestion patterns, unit commitment, reserves)<br>Analyse sensitivity across demand, renewable, and outage scenarios<br>Select scenario for market clearing, planning, or policy evaluation',
      thoughts:  '&ldquo;Which scenario ensures both reliability and efficient pricing?&rdquo;<br>&ldquo;Where does congestion create inefficiencies?&rdquo;<br>&ldquo;Are results consistent across key assumptions?&rdquo;',
      painpoint: 'Complexity in interpreting price vs constraint relationships<br>Managing large number of scenarios<br>Ensuring fairness and realism in scenario comparison',
      emotions:  'Analytical during comparison<br>Uncertainty when results conflict<br>Confidence when patterns and optimal scenario are clear',
      tool:      'PLEXOS scenario comparison &amp; reporting<br>Market analytics dashboards<br>BI / visualization tools for multi-scenario analysis',
      ai:        '<strong>Where AI Helps:</strong> Risk ranking<br><br><strong>Example AI Capability:</strong><br>AI ranks scenarios: &ldquo;Scenario B has highest reliability risk&rdquo;'
    }
  },
  {
    title: 'Results | Clear market and ensure system reliability',
    rt: {
      goal:      'Ensure system remains balanced and stable after actions<br>Confirm reliability constraints (frequency, reserves, congestion) are met<br>Deliver secure and continuous power system operation',
      actions:   'Monitor actual system performance (frequency, flows, reserves, congestion)<br>Execute corrective actions (redispatch, reserve activation, load balancing)<br>Continuously adjust operations based on real-time conditions',
      thoughts:  '&ldquo;Is the system stable after interventions?&rdquo;<br>&ldquo;Are all constraints being respected?&rdquo;<br>&ldquo;Do we need further adjustments?&rdquo;',
      painpoint: 'Continuous need for monitoring and rapid response<br>Unexpected deviations from predicted conditions<br>Difficulty linking outcomes to specific actions or causes',
      emotions:  'Relief when system remains stable<br>Stress during unexpected disturbances<br>Confidence when operations are under control',
      tool:      'SCADA / EMS operational systems<br>Real-time monitoring dashboards<br>Control room tools for dispatch and reserve activation',
      ai:        '<strong>Where AI Helps:</strong> Real-time monitoring<br><br><strong>Example AI Capability:</strong><br>AI alerts: &ldquo;Frequency risk in next 15 min&rdquo;'
    },
    da: {
      goal:      'Deliver efficient and reliable market outcomes (price, dispatch, congestion)<br>Ensure fairness and transparency in market clearing<br>Provide insights for future planning and market design improvements',
      actions:   'Publish market results (LMP, unit commitment, congestion outcomes)<br>Communicate outcomes to participants and stakeholders<br>Feed results into planning, policy, and future model improvements',
      thoughts:  '&ldquo;Are market outcomes efficient and fair?&rdquo;<br>&ldquo;Did constraints drive expected price signals?&rdquo;<br>&ldquo;What improvements are needed for future runs?&rdquo;',
      painpoint: 'Differences between forecast and actual outcomes<br>Stakeholder scrutiny and regulatory requirements<br>Complexity in explaining price and congestion outcomes',
      emotions:  'Satisfaction when market clears efficiently<br>Pressure from regulatory and stakeholder expectations<br>Confidence when outcomes are transparent and defensible',
      tool:      'PLEXOS output and reporting tools<br>Market Management Systems (result publication)<br>BI / reporting dashboards for stakeholders',
      ai:        '<strong>Where AI Helps:</strong> Real-time monitoring<br><br><strong>Example AI Capability:</strong><br>AI alerts: &ldquo;Frequency risk in next 15 min&rdquo;'
    }
  }
];

function isoCarouselRender(index) {
  var d = isoData[index];
  document.getElementById('isoStepTitle').innerHTML      = d.title;
  document.getElementById('isoStepTitleDA').innerHTML    = d.title;
  document.getElementById('iso-rt-goal').innerHTML       = d.rt.goal;
  document.getElementById('iso-rt-actions').innerHTML    = d.rt.actions;
  document.getElementById('iso-rt-thoughts').innerHTML   = d.rt.thoughts;
  document.getElementById('iso-rt-painpoint').innerHTML  = d.rt.painpoint;
  document.getElementById('iso-rt-emotions').innerHTML   = d.rt.emotions;
  document.getElementById('iso-rt-tool').innerHTML       = d.rt.tool;
  document.getElementById('iso-rt-ai').innerHTML         = d.rt.ai;
  document.getElementById('iso-da-goal').innerHTML       = d.da.goal;
  document.getElementById('iso-da-actions').innerHTML    = d.da.actions;
  document.getElementById('iso-da-thoughts').innerHTML   = d.da.thoughts;
  document.getElementById('iso-da-painpoint').innerHTML  = d.da.painpoint;
  document.getElementById('iso-da-emotions').innerHTML   = d.da.emotions;
  document.getElementById('iso-da-tool').innerHTML       = d.da.tool;
  document.getElementById('iso-da-ai').innerHTML         = d.da.ai;
  document.querySelectorAll('#isoCarouselDots .carousel-dot').forEach(function(btn, i) {
    btn.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.iso-step-indicator').forEach(function(el) {
    el.textContent = (index + 1) + ' / ' + isoData.length;
  });
  isoCurrentStep = index;
}

function isoCarouselMove(dir) {
  isoCarouselRender((isoCurrentStep + dir + isoData.length) % isoData.length);
}

function isoCarouselGoTo(index) {
  isoCarouselRender(index);
}

window.addEventListener('DOMContentLoaded', function() { isoCarouselRender(0); });

// ===== LSE Journey Carousel =====
var lseCurrentStep = 0;
var lseData = [
  {
    title: 'Gather Input &amp; Prepare | Collect demand, contracts, and market data',
    rt: {
      goal:      'Ensure reliable real-time power supply<br>Minimize imbalance costs and price exposure<br>Maintain grid stability under uncertainty',
      actions:   'Monitor real-time load, generation, outages, and congestion<br>Continuously compare forecast vs actual and trigger adjustments<br>Adjust dispatch or procure power as needed',
      thoughts:  '&ldquo;Is the forecast still accurate?&rdquo;<br>&ldquo;Do we have enough capacity right now?&rdquo;<br>&ldquo;Are prices or outages creating risk?&rdquo;',
      painpoint: 'Inaccurate load or renewable forecasts<br>Sudden outages and unexpected events<br>Limited real-time visibility and coordination',
      emotions:  'High alert during volatile conditions<br>Stress from uncertainty and rapid decisions<br>Relief when system operates smoothly',
      tool:      'PLEXOS (short-term simulation)<br>SCADA / EMS systems<br>Market &amp; weather data dashboards + ISO Market Systems (RTM portals)',
      ai:        '<strong>Where AI Helps:</strong> Data integration &amp; cleaning<br><br><strong>Example AI Capability:</strong><br>Auto-ingest data from ISO, weather, fuel APIs + anomaly detection'
    },
    da: {
      goal:      'Procure lowest-cost and reliable energy<br>Optimize portfolio (generation, contracts, market)<br>Ensure adequacy and regulatory compliance',
      actions:   'Gather demand, weather, fuel, and asset data<br>Run PLEXOS simulations and scenario analysis<br>Validate results and prepare DAM bids',
      thoughts:  '&ldquo;Is my forecast accurate enough?&rdquo;<br>&ldquo;What if key assumptions change (renewables, demand)?&rdquo;<br>&ldquo;Which scenario is most reliable for decisions?&rdquo;',
      painpoint: 'Data dependency across multiple teams<br>High model complexity and uncertainty<br>Tight timelines and validation challenges',
      emotions:  'Focused during analysis<br>Pressure near deadlines<br>Confidence when results align with expectations',
      tool:      'PLEXOS (modelling &amp; simulation)<br>Excel / data pipelines<br>Forecasting &amp; market data tools + ISO Market Systems (DAM portals)',
      ai:        '<strong>Where AI Helps:</strong> Data integration &amp; cleaning<br><br><strong>Example AI Capability:</strong><br>Auto-ingest data from ISO, weather, fuel APIs + anomaly detection'
    }
  },
  {
    title: 'Simulation Setting | Configure procurement and demand models',
    rt: {
      goal:      'Configure a simulation that reflects current system conditions and operating constraints<br>Set the correct short-term horizon for dispatch, balancing, and reliability decisions<br>Generate reports that support immediate operational and market actions',
      actions:   'Select real-time horizon, step size, and update frequency for the run<br>Latest inputs: load, outages, fuel availability, renewable forecast, reserves, congestion constraints<br>Choose required outputs such as price, dispatch, reserve, imbalance, and shortage reports',
      thoughts:  '&ldquo;Did I set the right horizon and granularity for this operating window?&rdquo;<br>&ldquo;Are all critical constraints and latest system conditions included?&rdquo;<br>&ldquo;Will the outputs answer the operational decision I need right now?&rdquo;',
      painpoint: 'Wrong horizon or step size can make results less useful for operations<br>Missing or stale inputs can distort dispatch and balancing outcomes<br>Too many report options make it hard to focus on the most decision-relevant outputs',
      emotions:  'Careful while configuring high-impact short-term runs<br>Tense when time is limited and system conditions are changing<br>Reassured when settings match the real operating situation',
      tool:      'PLEXOS short-term market / dispatch simulation<br>SCADA / EMS and ISO real-time market inputs<br>Market, outage, weather, and renewable forecast data sources',
      ai:        '<strong>Where AI Helps:</strong> Model configuration assistance<br><br><strong>Example AI Capability:</strong><br>AI suggests parameters (load growth, reserves, constraints)'
    },
    da: {
      goal:      'Set up simulations for day-ahead, week-ahead, or forward planning decisions<br>Align horizon, assumptions, and scenarios with procurement, planning, and compliance needs<br>Produce reports for bids, adequacy, cost, and portfolio decisions',
      actions:   'Define study horizon, scenario set, and market/planning assumptions<br>Configure model settings for dispatch, capacity, reliability, fuel, and policy constraints<br>Select output reports such as forecast, unit commitment, adequacy, bidding, and investment reports',
      thoughts:  '&ldquo;Is this the right horizon for the business question: day-ahead, week-ahead, or longer?&rdquo;<br>&ldquo;Do my simulation assumptions reflect realistic demand, fuel, and renewable conditions?&rdquo;<br>&ldquo;Will these reports be strong enough to support bids, planning, or stakeholder review?&rdquo;',
      painpoint: 'Choosing the right horizon and scenario scope is not always straightforward<br>Model settings become complex when many constraints and uncertainties are included<br>Results must be defensible against benchmark, history, and stakeholder scrutiny',
      emotions:  'Focused when structuring the simulation correctly<br>Uncertain when comparing multiple scenario setups<br>Confident when model design is aligned with the decision context',
      tool:      'PLEXOS modelling and scenario configuration<br>Excel / data pipelines for structured inputs<br>Forecast, fuel, market, and policy data sources plus ISO DAM portals',
      ai:        '<strong>Where AI Helps:</strong> Model configuration assistance<br><br><strong>Example AI Capability:</strong><br>AI suggests parameters (load growth, reserves, constraints)'
    }
  },
  {
    title: 'Execute Back Cast Model &amp; RUN | Validate model vs historical demand &amp; cost',
    rt: {
      goal:      'Recreate actual short-term operating conditions using historical data<br>Test whether dispatch, prices, and imbalance behaviour match what actually happened<br>Improve confidence in real-time forecasting and operating logic',
      actions:   'Load historical load, outage, renewable, weather, and RT market data<br>Run the back cast for selected historical hours or operating periods<br>Compare simulated results with actual dispatch, price, and shortage outcomes',
      thoughts:  '&ldquo;Does the model reproduce what actually happened?&rdquo;<br>&ldquo;Which hours or events are creating the biggest error?&rdquo;<br>&ldquo;Can this setup be trusted for live operational decisions?&rdquo;',
      painpoint: 'Historical operational data may be incomplete or inconsistent<br>Volatile events are hard to recreate accurately<br>It is difficult to isolate whether errors come from data, assumptions, or model setup',
      emotions:  'Focused while replaying critical periods<br>Frustrated when results do not match history<br>More confident when back cast results align with actual outcomes',
      tool:      'PLEXOS short-term simulation / back cast setup<br>Historical SCADA / EMS / ISO real-time data<br>Weather, outage, and renewable history datasets',
      ai:        '<strong>Where AI Helps:</strong> Error detection &amp; calibration<br><br><strong>Example AI Capability:</strong><br>AI highlights mismatch (forecast vs actual) and suggests corrections'
    },
    da: {
      goal:      'Validate the base model against historical market outcomes before using it forward<br>Calibrate assumptions for demand, fuel, renewables, and constraints<br>Build a defensible benchmark for future scenarios, bids, and planning',
      actions:   'Run back cast using historical demand, weather, fuel, outage, and market data<br>Compare benchmark actual market results with base model outputs<br>Adjust assumptions and rerun until the model tracks history closely',
      thoughts:  '&ldquo;Is the base model close enough to the benchmark?&rdquo;<br>&ldquo;Which assumption is causing the gap between simulated and actual results?&rdquo;<br>&ldquo;Is this accurate enough to support scenarios, bids, or stakeholder review?&rdquo;',
      painpoint: 'Limited historical data can weaken back cast accuracy<br>Binding constraints and real market behaviour are hard to capture correctly<br>Results must stand up to benchmarking and stakeholder scrutiny',
      emotions:  'Analytical when comparing benchmark vs model<br>Uncertain when large deviations appear<br>Reassured when results are defensible and close to history',
      tool:      'PLEXOS base model / benchmark setup<br>Historical ISO market, fuel, weather, and load datasets<br>Excel / data pipelines for calibration and comparison',
      ai:        '<strong>Where AI Helps:</strong> Error detection &amp; calibration<br><br><strong>Example AI Capability:</strong><br>AI highlights mismatch (forecast vs actual) and suggests corrections'
    }
  },
  {
    title: 'Analyse Solution | Analyse cost, supply mix, and adequacy',
    rt: {
      goal:      'Assess whether simulated results support real-time operational decisions<br>Identify deviations in price, dispatch, congestion, and imbalance<br>Ensure reliability and cost outcomes are within acceptable limits',
      actions:   'Review outputs: price (LMP), dispatch, reserves, congestion, imbalance<br>Compare simulation vs current/actual system conditions<br>Flag anomalies and trigger corrective operational actions',
      thoughts:  '&ldquo;Do these results reflect current system reality?&rdquo;<br>&ldquo;Are there any risks (price spikes, shortages, congestion)?&rdquo;<br>&ldquo;Do I need to adjust dispatch or procure more power?&rdquo;',
      painpoint: 'Too many outputs make it hard to identify key issues quickly<br>Real-time deviations can be difficult to interpret under time pressure<br>Lack of clear linkage between results and operational decisions',
      emotions:  'Alert while scanning for risks and anomalies<br>Pressure to interpret results quickly<br>Relief when results confirm stable system operation',
      tool:      'PLEXOS output dashboards (short-term results)<br>SCADA / EMS visualization tools<br>Real-time market and congestion dashboards',
      ai:        '<strong>Where AI Helps:</strong> Insight generation<br><br><strong>Example AI Capability:</strong><br>&ldquo;Top 3 cost drivers this month: fuel + peak demand + congestion&rdquo;'
    },
    da: {
      goal:      'Evaluate simulation outputs for decision-making (bidding, planning, investment)<br>Compare scenarios to identify optimal strategy<br>Validate results against benchmark, constraints, and business objectives',
      actions:   'Analyse outputs: price forecasts, unit commitment, generation mix, adequacy<br>Compare multiple scenarios (demand, renewables, fuel, policy changes)<br>Select best scenario for bidding, procurement, or planning decisions',
      thoughts:  '&ldquo;Which scenario gives the best cost vs reliability outcome?&rdquo;<br>&ldquo;Are results consistent with expectations and historical trends?&rdquo;<br>&ldquo;Can I defend this analysis to stakeholders or regulators?&rdquo;',
      painpoint: 'Difficulty comparing multiple scenarios effectively<br>High effort required to validate and interpret outputs<br>Need to justify results under stakeholder/regulatory scrutiny',
      emotions:  'Analytical when reviewing outputs<br>Uncertain when scenarios give conflicting results<br>Confident when a clear optimal solution emerges',
      tool:      'PLEXOS output reports &amp; scenario comparison tools<br>Excel / BI dashboards for analysis<br>Visualization tools for trends, cost, and reliability metrics',
      ai:        '<strong>Where AI Helps:</strong> Insight generation<br><br><strong>Example AI Capability:</strong><br>&ldquo;Top 3 cost drivers this month: fuel + peak demand + congestion&rdquo;'
    }
  },
  {
    title: 'Forecast/Base Model &amp; Run | Forecast demand and procurement needs',
    rt: {
      goal:      'Generate near-term forecasts for load, price, and system conditions<br>Anticipate short-term risks (spikes, outages, congestion)<br>Support proactive operational decisions before real-time events occur',
      actions:   'Run short-term forecast models using latest load, weather, and outage inputs<br>Update base model with current system conditions and constraints<br>Generate forward-looking outputs (price, dispatch, imbalance risk)',
      thoughts:  '&ldquo;How accurate are these short-term predictions?&rdquo;<br>&ldquo;Are there any upcoming risks we should act on early?&rdquo;<br>&ldquo;Do we need to adjust positions before real-time?&rdquo;',
      painpoint: 'Forecast accuracy is sensitive to weather and renewable variability<br>Rapid system changes can make predictions outdated quickly<br>Limited visibility into sudden outages or market behaviour',
      emotions:  'Alert while anticipating near-term risks<br>Uncertain due to forecast variability<br>Confident when predictions align with trends',
      tool:      'PLEXOS short-term forecasting / dispatch models<br>Weather &amp; renewable forecast tools<br>Market data feeds and RTM signals',
      ai:        '<strong>Where AI Helps:</strong> Forecasting automation<br><br><strong>Example AI Capability:</strong><br>AI generates load forecast using weather + history'
    },
    da: {
      goal:      'Build future scenarios for demand, price, and system behaviour<br>Generate base model outputs for bidding, planning, and investment<br>Support forward decisions with reliable and defensible forecasts',
      actions:   'Run base model using forecasted demand, fuel, weather, and policy inputs<br>Generate multiple scenarios (high/low demand, renewable variability, fuel changes)<br>Produce outputs for price, unit commitment, adequacy, and cost',
      thoughts:  '&ldquo;Which forecast scenario is most realistic?&rdquo;<br>&ldquo;How sensitive are results to key assumptions?&rdquo;<br>&ldquo;Can I rely on this for bidding or planning decisions?&rdquo;',
      painpoint: 'High uncertainty in long-term assumptions (demand, fuel, renewables)<br>Managing multiple scenarios becomes complex<br>Ensuring forecast credibility for stakeholders and regulators',
      emotions:  'Analytical while exploring scenarios<br>Uncertain when results vary across assumptions<br>Confident when forecasts are consistent and validated',
      tool:      'PLEXOS forecasting &amp; scenario modelling<br>Forecasting tools (load, price, renewables, fuel)<br>Data pipelines, market data, and ISO DAM systems',
      ai:        '<strong>Where AI Helps:</strong> Forecasting automation<br><br><strong>Example AI Capability:</strong><br>AI generates load forecast using weather + history'
    }
  },
  {
    title: 'Forecast/Base Model + Scenario-A,,, &amp; Run | Test supply/demand &amp; investment scenarios',
    rt: {
      goal:      'Test multiple short-term scenarios (load spikes, outages, renewable swings)<br>Identify best operational response under uncertainty<br>Reduce risk before events occur in real-time operations',
      actions:   'Create scenarios (high load, outage event, low renewable output)<br>Run simulations for each scenario using updated system conditions<br>Compare outputs (price, dispatch, imbalance) across scenarios',
      thoughts:  '&ldquo;What happens if conditions worsen suddenly?&rdquo;<br>&ldquo;Which scenario shows the highest operational risk?&rdquo;<br>&ldquo;Do we need a contingency plan before real-time?&rdquo;',
      painpoint: 'Scenario setup can be time-consuming under tight timelines<br>Hard to prioritize which scenarios matter most<br>Results may vary significantly across scenarios',
      emotions:  'Alert while preparing for uncertainty<br>Pressure to evaluate multiple outcomes quickly<br>Confidence when a clear contingency plan is identified',
      tool:      'PLEXOS scenario simulation (short-term runs)<br>Real-time data feeds (load, outages, weather)<br>Market dashboards for scenario comparison',
      ai:        '<strong>Where AI Helps:</strong> Scenario generation<br><br><strong>Example AI Capability:</strong><br>AI creates scenarios (high demand, low renewable, price spike)'
    },
    da: {
      goal:      'Evaluate multiple future scenarios for planning, bidding, and investment<br>Understand sensitivity of results to key drivers (demand, fuel, renewables)<br>Select optimal strategy under uncertainty',
      actions:   'Define scenarios (high/low demand, fuel price changes, renewable variability, policy shifts)<br>Run PLEXOS simulations for each scenario using base model<br>Compare outputs (price, unit commitment, adequacy, cost) to select best scenario',
      thoughts:  '&ldquo;Which scenario is most realistic vs worst-case?&rdquo;<br>&ldquo;How sensitive are results to key assumptions?&rdquo;<br>&ldquo;Which scenario should drive our bidding or planning decision?&rdquo;',
      painpoint: 'Managing large number of scenarios becomes complex<br>Difficulty comparing outputs across scenarios effectively<br>Need to justify scenario selection to stakeholders',
      emotions:  'Analytical when evaluating multiple scenarios<br>Uncertain when scenarios give conflicting signals<br>Confident when one scenario clearly stands out',
      tool:      'PLEXOS scenario management &amp; simulation<br>Excel / BI tools for comparison<br>Forecasting, fuel, and policy data sources + ISO DAM systems',
      ai:        '<strong>Where AI Helps:</strong> Scenario generation<br><br><strong>Example AI Capability:</strong><br>AI creates scenarios (high demand, low renewable, price spike)'
    }
  },
  {
    title: 'Compare Scenarios | Select least-cost reliable option',
    rt: {
      goal:      'Select the safest and most reliable scenario for immediate action<br>Minimize operational risk (price spikes, shortages, congestion)<br>Enable fast, confident real-time decisions',
      actions:   'Compare scenario outputs (price, dispatch, reserves, imbalance)<br>Identify worst-case vs best-case scenarios<br>Choose and trigger the most reliable contingency plan',
      thoughts:  '&ldquo;Which scenario is safest to act on right now?&rdquo;<br>&ldquo;Are we covered if conditions worsen?&rdquo;<br>&ldquo;Do we need immediate corrective action?&rdquo;',
      painpoint: 'Time pressure limits deep comparison<br>Hard to interpret multiple scenario differences quickly<br>Risk of missing critical edge-case scenarios',
      emotions:  'High pressure during rapid decision-making<br>Alert when risk scenarios emerge<br>Confidence when a clear action path is identified',
      tool:      'PLEXOS scenario comparison outputs<br>Real-time dashboards (price, congestion, imbalance)<br>SCADA / EMS operational systems',
      ai:        '<strong>Where AI Helps:</strong> Decision support<br><br><strong>Example AI Capability:</strong><br>AI recommends best scenario: &ldquo;Lowest cost with acceptable risk&rdquo;'
    },
    da: {
      goal:      'Select optimal scenario for bidding, planning, or investment decisions<br>Balance cost, reliability, and risk across scenarios<br>Ensure decisions are defensible and aligned with strategy',
      actions:   'Compare scenario outputs (price, unit commitment, adequacy, cost)<br>Evaluate trade-offs across demand, fuel, and renewable assumptions<br>Select final scenario for DAM bids or planning decisions',
      thoughts:  '&ldquo;Which scenario gives best cost vs reliability outcome?&rdquo;<br>&ldquo;How sensitive is the result to key assumptions?&rdquo;<br>&ldquo;Can I defend this choice to stakeholders/regulators?&rdquo;',
      painpoint: 'Too many scenarios to compare efficiently<br>Conflicting results across scenarios<br>Need strong justification for final selection',
      emotions:  'Analytical during comparison<br>Uncertain when no clear winner exists<br>Confident when optimal scenario is clear',
      tool:      'PLEXOS scenario comparison &amp; reporting<br>Excel / BI dashboards<br>Market, fuel, and forecast data sources',
      ai:        '<strong>Where AI Helps:</strong> Decision support<br><br><strong>Example AI Capability:</strong><br>AI recommends best scenario: &ldquo;Lowest cost with acceptable risk&rdquo;'
    }
  },
  {
    title: 'Results | Procure power and serve customers',
    rt: {
      goal:      'Deliver actionable outputs for immediate system operation<br>Confirm system reliability and cost performance<br>Enable quick response to real-time events',
      actions:   'Review final outputs (price, dispatch, reserves, imbalance)<br>Execute operational decisions (dispatch changes, procure power)<br>Monitor outcomes and adjust in real time',
      thoughts:  '&ldquo;Are we operating within safe and cost limits?&rdquo;<br>&ldquo;Did the decision perform as expected?&rdquo;<br>&ldquo;Do we need further adjustments?&rdquo;',
      painpoint: 'Continuous monitoring required as conditions change<br>Limited time to react to unexpected deviations<br>Difficulty linking results directly to prior assumptions',
      emotions:  'Relief when system runs smoothly<br>Stress during unexpected deviations<br>Confidence when outcomes match expectations',
      tool:      'SCADA / EMS operational systems<br>Real-time market dashboards (LMP, congestion)<br>PLEXOS output monitoring (short-term)',
      ai:        '<strong>Where AI Helps:</strong> Monitoring &amp; alerting<br><br><strong>Example AI Capability:</strong><br>AI flags deviations: &ldquo;Actual demand 8% higher than forecast&rdquo;'
    },
    da: {
      goal:      'Deliver final outputs for bidding, planning, and investment decisions<br>Ensure results meet cost, reliability, and regulatory objectives<br>Provide defensible insights for stakeholders',
      actions:   'Finalize outputs (price forecast, unit commitment, adequacy, cost)<br>Submit DAM bids or planning recommendations<br>Share results with stakeholders (internal/external)',
      thoughts:  '&ldquo;Are these results strong enough to act on?&rdquo;<br>&ldquo;Will this hold under real market conditions?&rdquo;<br>&ldquo;Can I confidently defend this outcome?&rdquo;',
      painpoint: 'Risk of deviation between forecast and actual outcomes<br>Pressure to justify results to stakeholders/regulators<br>Translating complex outputs into clear decisions',
      emotions:  'Satisfaction when results align with expectations<br>Pressure before final submission or approval<br>Confidence when outcomes are accepted and validated',
      tool:      'PLEXOS final output reports<br>Excel / BI dashboards for reporting<br>ISO DAM systems and stakeholder reporting tools',
      ai:        '<strong>Where AI Helps:</strong> Monitoring &amp; alerting<br><br><strong>Example AI Capability:</strong><br>AI flags deviations: &ldquo;Actual demand 8% higher than forecast&rdquo;'
    }
  }
];

function lseCarouselRender(index) {
  var d = lseData[index];
  document.getElementById('lseStepTitle').innerHTML      = d.title;
  document.getElementById('lseStepTitleDA').innerHTML    = d.title;
  document.getElementById('lse-rt-goal').innerHTML       = d.rt.goal;
  document.getElementById('lse-rt-actions').innerHTML    = d.rt.actions;
  document.getElementById('lse-rt-thoughts').innerHTML   = d.rt.thoughts;
  document.getElementById('lse-rt-painpoint').innerHTML  = d.rt.painpoint;
  document.getElementById('lse-rt-emotions').innerHTML   = d.rt.emotions;
  document.getElementById('lse-rt-tool').innerHTML       = d.rt.tool;
  document.getElementById('lse-rt-ai').innerHTML         = d.rt.ai;
  document.getElementById('lse-da-goal').innerHTML       = d.da.goal;
  document.getElementById('lse-da-actions').innerHTML    = d.da.actions;
  document.getElementById('lse-da-thoughts').innerHTML   = d.da.thoughts;
  document.getElementById('lse-da-painpoint').innerHTML  = d.da.painpoint;
  document.getElementById('lse-da-emotions').innerHTML   = d.da.emotions;
  document.getElementById('lse-da-tool').innerHTML       = d.da.tool;
  document.getElementById('lse-da-ai').innerHTML         = d.da.ai;
  document.querySelectorAll('#lseCarouselDots .carousel-dot').forEach(function(btn, i) {
    btn.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.lse-step-indicator').forEach(function(el) {
    el.textContent = (index + 1) + ' / ' + lseData.length;
  });
  lseCurrentStep = index;
}

function lseCarouselMove(dir) {
  lseCarouselRender((lseCurrentStep + dir + lseData.length) % lseData.length);
}

function lseCarouselGoTo(index) {
  lseCarouselRender(index);
}

window.addEventListener('DOMContentLoaded', function() { lseCarouselRender(0); });

// ===== Scroll Sync =====
function initScrollSync() {
  var sections = Array.from(document.querySelectorAll('.section'));
  var navLinks = document.querySelectorAll('.nav-button');

  function syncNav() {
    var offset = (document.getElementById('topband').offsetHeight || 90) + 24;
    var current = sections[0] ? sections[0].id : '';

    sections.forEach(function(section) {
      if (section.getBoundingClientRect().top <= offset + 10) {
        current = section.id;
      }
    });

    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();
}

window.addEventListener('DOMContentLoaded', initScrollSync);
