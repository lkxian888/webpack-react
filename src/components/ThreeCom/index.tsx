import React, { FC, useEffect } from 'react';
import styles from './index.scss';
// import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Mesh, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

const THREE = require('three');

let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer;
let geometry, material, mesh: Mesh, controls: OrbitControls;

const ThreeCom: FC = () => {
  console.log(THREE);

  const animation = (time: number) => {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
  };

  const init = () => {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.getElementById('threeId').appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
  };

  useEffect(() => {
    init();
  }, []);

  return <div id="threeId" className={styles.ThreeWrap}></div>;
};

export default ThreeCom;
