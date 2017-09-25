var Konva = require('konva');

var width = window.innerWidth * 0.9;
var height = window.innerHeight * 0.9;
var short_seq = 'AGAGAGAAGCGAGGTTTCCATTCTGAGGGACGGCGTAGAGTTCGGCCGAAGGAACCTGACCCAGGCTCTG';
var long_seq = 'AGAGAGAAGCGAGGTTTCCATTCTGAGGGACGGCGTAGAGTTCGGCCGAAGGAACCTGACCCAGGCTCTG' +
    'TGAGGAGGCAAGGTTTTCAGGGGACAGGCCAACCCAGAGGACAGGATTCCCTGGAGGCCACAGAGGAGCA' +
    'CCAAGGAGAAGATCTGCCTGTGGGTCTTCATTGCCCAGCTCCTGCCCACACTCCTGCCTGCTGCCCTGAC' +
    'GAGAGTCATCATGTCTCTTGAGCAGAGGAGTCTGCACTGCAAGCCTGAGGAAGCCCTTGAGGCCCAACAA' +
    'GAGGCCCTGGGCCTGGTGTGTGTGCAGGCTGCCACCTCCTCCTCCTCTCCTCTGGTCCTGGGCACCCTGG' +
    'AGGAGGTGCCCACTGCTGGGTCAACAGATCCTCCCCAGAGTCCTCAGGGAGCCTCCGCCTTTCCCACTAC' +
    'CATCAACTTCACTCGACAGAGGCAACCCAGTGAGGGTTCCAGCAGCCGTGAAGAGGAGGGGCCAAGCACC' +
    'TCTTGTATCCTGGAGTCCTTGTTCCGAGCAGTAATCACTAAGAAGGTGGCTGATTTGGTTGGTTTTCTGC' +
    'TCCTCAAATATCGAGCCAGGGAGCCAGTCACAAAGGCAGAAATGCTGGAGAGTGTCATCAAAAATTACAA' +
    'GCACTGTTTTCCTGAGATCTTCGGCAAAGCCTCTGAGTCCTTGCAGCTGGTCTTTGGCATTGACGTGAAG' +
    'GAAGCAGACCCCACCGGCCACTCCTATGTCCTTGTCACCTGCCTAGGTCTCTCCTATGATGGCCTGCTGG' +
    'GTGATAATCAGATCATGCCCAAGACAGGCTTCCTGATAATTGTCCTGGTCATGATTGCAATGGAGGGCGG' +
    'CCATGCTCCTGAGGAGGAAATCTGGGAGGAGCTGAGTGTGATGGAGGTGTATGATGGGAGGGAGCACAGT' +
    'GCCTATGGGGAGCCCAGGAAGCTGCTCACCCAAGATTTGGTGCAGGAAAAGTACCTGGAGTACCGGCAGG' +
    'TGCCGGACAGTGATCCCGCACGCTATGAGTTCCTGTGGGGTCCAAGGGCCCTCGCTGAAACCAGCTATGT' +
    'GAAAGTCCTTGAGTATGTGATCAAGGTCAGTGCAAGAGTTCGCTTTTTCTTCCCATCCCTGCGTGAAGCA' +
    'GCTTTGAGAGAGGAGGAAGAGGGAGTCTGAGCATGAGTTGCAGCCAAGGCCAGTGGGAGGGGGACTGGGC' +
    'CAGTGCACCTTCCAGGGCCGCGTCCAGCAGCTTCCCCTGCCTCGTGTGACATGAGGCCCATTCTTCACTC' +
    'TGAAGAGAGCGGTCAGTGTTCTCAGTAGTAGGTTTCTGTTCTATTGGGTGACTTGGAGATTTATCTTTGT' +
    'TCTCTTTTGGAATTGTTCAAATGTTTTTTTTTAAGGGATGGTTGAATGAACTTCAGCATCCAAGTTTATG' +
    'AATGACAGCAGTCACACAGTTCTGTGTATATAGTTTAAGGGTAAGAGTCTTGTGTTTTATTCAGATTGGG' +
    'AAATCCATTCTATTTTGTGAATTGGGATAATAACAGCAGTGGAATAAGTACTTAGAAATGTGAAAAATGA' +
    'GCAGTAAAATAGATGAGATAAAGAACTAAAGAAATTAAGAGATAGTCAATTCTTGCCTTATACCTCAGTC' +
    'TATTCTGTAAAATTTTTAAAGATATATGCATACCTGGATTTCCTTGGCTTCTTTGAGAATGTAAGAGAAA' +
    'TTAAATCTGAATAAAGAATTCTTCCTGTTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAA';

var stage = new Konva.Stage({
    container: 'app',
    width: width,
    height: height
});

var layer = new Konva.Layer();
var basesLayer = new Konva.Layer();
var circle = new Konva.Circle({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});

var rect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    fill: 'green',
    stroke: 'red',
    strokeWidth: 4
});

var initial_radius = width > height ? height / 2 * 0.8 : width / 2 * 0.8;
var seq_circle = new Konva.Circle({
    x: width / 2,
    y: height / 2,
    radius: initial_radius,
    strokeWidth: 4,
    stroke: 'black'
});
var seq_len = long_seq.length;

layer.add(seq_circle);

stage.add(layer);

var scaleBy = 1.1;

var arcs = [];

for (var i = 0; i < seq_len; i++) {

    var colr = null;
    switch(long_seq[i]){
        case 'A':
            colr = 'red';
            break;
        case 'C':
            colr = 'green';
            break;
        case 'T':
            colr = 'blue';
            break;
        case 'G':
            colr = 'yellow';
    }

    var arc = new Konva.Arc({
        innerRadius: initial_radius,
        outerRadius: initial_radius + 10,
        angle: 360 / seq_len,
        fill: colr,
        rotation: - 90 + (360 / seq_len * (i+1)),
        x: width / 2,
        y: height / 2
    });

    arcs.push(arc);
}



window.addEventListener('wheel', function (e) {
    e.preventDefault();
    var current_radius = seq_circle.radius();
    // console.log(current_radius);

    var cur_position = seq_circle.position();

    var new_radius = e.deltaY > 0 ? current_radius * scaleBy : current_radius / scaleBy;

    var new_position = {
        x: cur_position.x,
        y: cur_position.y + (new_radius - current_radius)
    };

    seq_circle.position(new_position);
    seq_circle.radius(new_radius);

    var sin_alpha = (width / 2) / new_radius;
    var alpha = (sin_alpha^(-1)) * (180 / Math.PI);

    var current_rotation = layer.rotation();

    var layer_rotation = e.deltaY > 0 ? current_rotation + 20 : current_rotation - 20;
    console.log(layer_rotation);


    if ((new_radius * Math.PI * 2 / seq_len) > 4) {
        for (var i = 0; i < arcs.length; i++) {
            if (arcs[i].rotation() > 270 + alpha || arcs[i].rotation() > -90 && arcs[i].rotation() < - 90 - alpha) {
                arcs[i].position(new_position);
                arcs[i].innerRadius(new_radius);
                arcs[i].outerRadius(new_radius + 10);
                layer.add(arcs[i]);
            }
        }
    } else {
        for (var j = 0; j < arcs.length; j++) {
            arcs[j].remove();
        }
    }

    layer.batchDraw();
});

// function Sequence(seq) {
//     var seq_len = seq.length;
//     var scale = 1;
//     var seq_layer = new Konva.Layer();
//
//     // create sequence
//     // circumference / seq_len < 6 --> arc, else --> character
//
//     var char = 'A';
//
//     var color = null;
//     switch(char){
//         case 'A':
//             color = 'red';
//             break;
//         case 'T':
//             color = 'green';
//             break;
//         case 'C':
//             color = 'blue';
//             break;
//         case 'G':
//             color = 'yellow';
//             break;
//     }
//
//     var arc = new Konva.Arc({
//         x: 400,
//         y: 400,
//         innerRadius: 150,
//         outerRadius: 160,
//         angle: 60,
//         color: 'yellow'
//     });
//
//     seq_layer.add(arc);
//     return seq_layer;
// }

