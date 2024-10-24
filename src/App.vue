<template>

<img alt="Logo" src="./assets/FitnessLogo.png" class="logo">
<HelloWorld msg="Your perfect Training Plan to boost your Performance!"/>

  <div id="app">
    <!-- Überschrift, die den Bereich "Trainingspläne" beschreibt -->
    <h1>Trainingspläne</h1>

    <!-- Hier wird die PlanList-Komponente eingefügt, die die Liste der Trainingspläne rendert -->
    <PlanList />
  </div>
</template>

<script>
// Importiere die PlanList-Komponente, die wir gerade erstellt haben
import PlanList from './components/PlanList.vue';

export default {
  name: 'App', // Name der Hauptkomponente

  // Wir fügen die PlanList-Komponente in diese Hauptkomponente ein
  components: {
    PlanList
  }
};
</script>

<style>
/* Styling für das Logo */
.logo {
  display: block;
  margin: 0 auto;
  width: 150px; /* Breite des Logos */
  height: 150px; /* Höhe passt sich automatisch an */
  margin-bottom: 20px; /* Abstand unter dem Logo */
}

/* Styling für die Hauptseite */
h1 {
  text-align: center; /* Zentriert die Überschrift */
  color: #42b983; /* Setzt die Farbe der Überschrift auf Grün */
}
</style>


