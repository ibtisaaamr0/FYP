import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const AvatarView = ({ currentAnimation }) => {
  const webViewRef = useRef(null);

  // Send a message to the 3D viewer to play an animation
  const playGesture = (animName) => {
    if (!animName) return;
    const js = `if(window.playAnimation) window.playAnimation("${animName}");`;
    webViewRef.current?.injectJavaScript(js);
  };

  // Re-run whenever currentAnimation changes
  React.useEffect(() => {
    if (currentAnimation) {
      playGesture(currentAnimation);
    }
  }, [currentAnimation]);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
        <style>
          body { margin: 0; overflow: hidden; background: #FF6A3D; }
          #container { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="container"></div>
        <script>
          let mixer, model, clock;
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
          camera.position.set(0, 1, 3);

          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(window.devicePixelRatio);
          document.getElementById('container').appendChild(renderer.domElement);

          const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
          scene.add(ambientLight);
          const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
          dirLight.position.set(5, 5, 5);
          scene.add(dirLight);

          clock = new THREE.Clock();

          // Placeholder: Loading a simple humanoid or just a box if no model provided
          // The user should replace this URL with their exported Blender model
          const loader = new THREE.GLTFLoader();
          
          // For now, let's just show a simple colored box to verify it works
          const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.y = 1;
          scene.add(cube);

          window.playAnimation = (name) => {
            console.log("Playing gesture:", name);
            // Logic to play animation from mixer here
            if (cube) {
                cube.rotation.y += 1; // Visual feedback for now
            }
          };

          function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            if (mixer) mixer.update(delta);
            if (cube) cube.rotation.y += 0.01;
            renderer.render(scene, camera);
          }
          animate();

          window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
    overflow: 'hidden',
  },
  webview: {
    backgroundColor: 'transparent',
  },
});

export default AvatarView;
