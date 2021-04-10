require.config({
    paths: {
        jquery: 'http://ec2-54-196-34-239.compute-1.amazonaws.com/wp-content/themes/pdm-andamento/node_modules/jquery/dist/jquery',
        d3: 'http://ec2-54-196-34-239.compute-1.amazonaws.com/wp-content/themes/pdm-andamento/node_modules/d3/dist/d3.min',
        //leaflet: '../bower_components/leaflet/src/Leaflet',
        //leaflet: "//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.2/leaflet",
        foundation: 'http://ec2-54-196-34-239.compute-1.amazonaws.com/wp-content/themes/pdm-andamento/assets/bower_components/foundation/js/foundation',
        polyfil: 'http://ec2-54-196-34-239.compute-1.amazonaws.com/wp-content/themes/pdm-andamento/assets/bower_components/REM-unit-polyfill/js/rem',
        ticker: 'http://ec2-54-196-34-239.compute-1.amazonaws.com/wp-content/themes/pdm-andamento/assets/bower_components/jQuery-News-Ticker/includes/jquery.ticker',
        list: 'http://ec2-54-196-34-239.compute-1.amazonaws.com/wp-content/themes/pdm-andamento/assets/bower_components/list.js/dist/list',
        // mapbox: 'mapbox/mapbox',
        // 'leaflet.ajax': '../bower_components/leaflet.ajax/dist/leaflet.ajax.min',
        // 'leaflet.markercluster': '../bower_components/leaflet.markercluster/dist/leaflet.markercluster',
        // 'mapbox.fullscreen': 'mapbox/Leaflet.fullscreen.min'
    },
    shim: {
        // 'mapbox': {
        //     exports: 'L'
        // },
        // 'leaflet.ajax': {
        //     deps: ['leaflet' ]
        // },

        // 'leaflet.markercluster.with.mapbox': {
        //     deps: ['mapbox/mapbox']
        // },

        // 'leaflet.markercluster': {
        //   deps: ['mapbox'],
        //   exports: 'L'
        // },

        // 'mapbox.fullscreen': {
        //     deps: ['mapbox'],
        //     exports: 'L'
        // },

        d3: {
            exports: 'd3'
        },
        jQuery: {
            exports: 'jquery'
        },
        foundation: {
            deps: ['jquery']
        },
        polyfil: {
            exports: 'polyfil'
        },
        ticker: {
            deps: ['jquery']
        },
        list: {
          exports: 'List'
        }
    }
});

require(['chart', 'map', 'app', 'jquery', 'buscaPorCep', 'list', 'Config', 'polyfil', 'ticker'],
  function (chart, map, app, $, buscaPorCep, List, Config) {
    'use strict';
    // use app here
    app.init();
    // console.log(chart);
    // console.log(map);
    // console.log("retorno app: " + app);
    // console.log("retorno List: " + List);
    // console.log("retorno Config: " + Config);
    // startup map
    $('.map-render').each(function () {
        // console.log(this);
        map.init(this);
    });

    // startup project map
    $('.projects-map-render').each(function () {
        // console.log(this);
        map.plotProjects(this);
    });

    // console.log("is Chart? --> "+$('.chart-render'));
    // startup chart
    $('.chart-render').each(function () {
        var data = $(this).data('chart');
        console.log("retorno chart: "+data.type);
        switch (data.type) {
           case 'pie':
              switch (data.size) {
                  case 'small':
                      chart.pieSmall(this, data.values);
                      break;
                  case 'large':
                      chart.pieLarge(this, data.values);
                      break;
              }
              break;
            case 'line':
                chart.line(this, data_chart.labels, data_chart.values[0]);
                break;
            case 'line2':
                chart.line(this, data_chart2.labels, data_chart2.values[0]);
                break;
            case 'line3':
                chart.line(this, data_chart.labels, data.values[0]);
                break;
        }
    });

    jQuery('form[name="projetos-por-perto"] input[name="cep"]');

    jQuery('form[name="projetos-por-perto"] .bprefeitura').on('click', function (evt) {
      window.location = SITE_URL + '/projetos/?subprefeitura=' + jQuery('select#subprefeitura-topo').val() + '#resultado';
    });
     jQuery('form[name="metas-por-objetivo"] .bojetivo').on('click', function (evt) {
      window.location = SITE_URL + '/?objetivo=' + jQuery('select#objetivo-topo').val() + '#resultado';
    });
    jQuery('form[name="projetos-relacionados"] select#projetos-topo').on('change', function (evt) {
      window.location = SITE_URL + '/projeto/' + jQuery(evt.currentTarget).val();
    });

    jQuery('select#filtra-grafico-por-subprefeitura-a').on('change', function (evt) {
      chart.line(document.getElementById('chart-month-a'), data_chart.labels, data_chart.values[$(evt.currentTarget).val()]);
    });

    jQuery('select#filtra-grafico-por-subprefeitura-b').on('change', function (evt) {
      chart.line(document.getElementById('chart-month-b'), data_chart2.labels, data_chart2.values[$(evt.currentTarget).val()]);
    });

    buscaPorCep.init();

    map.adjustMapPosition();

    jQuery(window).resize(map.adjustMapPosition);
});




