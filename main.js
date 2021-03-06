var camera, scene, renderer;
var raycaster, plane, player, gem;
var mouse = new THREE.Vector2();
var enemies = [];
var enemySpeed = 3;
var scoreDiv = document.getElementById( "score" );
var bestScoreDiv = document.getElementById( "bestScore" );
var sphereRadius = 11.5
var enemyRangeX = 850;
var enemyRangeY = 775;
var gemRange = 500

init();
animate();


function init() {

var container = document.getElementById( "container")
renderer = new THREE.WebGLRenderer()
renderer.setSize( container.clientWidth, container.clientHeight )
document.body.appendChild( container )
container.appendChild( renderer.domElement )

//	camera

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.z = 400

//	scene
scene = new THREE.Scene()

//	cube properties
var geometry = new THREE.SphereGeometry(sphereRadius)

var material = new THREE.MeshBasicMaterial ({color: 0xFFF142})

//	enemies
var radius = 1200
var nBoxes = 50
for (var i = 0; i < nBoxes; i++){
  var cube = new THREE.Mesh( geometry, material )
  cube.position.set( radius/2 - radius * Math.random(),
             radius/2 - radius * Math.random(),
             0.0);
    scene.add(cube)
    enemies.push( cube );
  }

// gem
gem = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial ({ color: 0x00FFFF }) )
gem.position.set( gemRange/2 - gemRange * Math.random(),
          gemRange/2 - gemRange * Math.random(),
          0.0)
scene.add ( gem )

//	player

player = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() )
scene.add ( player )

addEventListener( 'mousemove', onDocumentMouseMove, false )

}

function onDocumentMouseMove( event ) {

  mouse.x = ( ( event.clientX - container.offsetLeft ) / container.clientWidth ) * 2 - 1;
  mouse.y = - ( ( event.clientY - container.offsetTop ) / container.clientHeight ) * 2 + 1;

  player.position.set( 275 * mouse.x, 275 * mouse.y, 0.0 );

}

function animate() {

  requestAnimationFrame( animate )

  //	enemy loop and detection
  for (var i= 0; i < enemies.length; i++){
    if ( enemies[i].position.y < -enemyRangeY/2) { //	for when enmies move below screen
      enemies[i].position.x = enemyRangeX/2 - enemyRangeX * Math.random() // sets new x coords for better random placement
      enemies[i].position.y = enemyRangeY/2 //	reset enemeny position to top of screen
    } else {
      if ( enemies[i].position.distanceTo ( player.position) < 2 * sphereRadius) {
        scoreDiv.innerHTML = "0" //	resets score
          }
    enemies[i].position.y -= enemySpeed
        }
    }

  //	gem collection
  if ( player.position.distanceTo (gem.position) < 2 * sphereRadius) {

    gem.position.x = gemRange/2 - gemRange * Math.random() // give the gem a random xy coord
    gem.position.y = gemRange/2 - gemRange * Math.random()

    var score = Number(scoreDiv.innerHTML) + 1 //	increments score
    scoreDiv.innerHTML = score.toString()

    var best = bestScoreDiv.innerHTML.split(' ')
    if ( score > Number( best[1] ) ) {
      bestScoreDiv.innerHTML = best[0] + " " + score.toString()
      }
  }

  renderer.render( scene, camera )

}
