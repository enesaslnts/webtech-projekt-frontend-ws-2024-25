<template>
  <div class="plan-container">
    <!-- Titel für den Bereich zur Erstellung eines neuen Trainingsplans -->
    <h3>Neuen Trainingsplan erstellen</h3>

    <!-- Eingabefeld für den Namen des neuen Plans -->
    <input v-model="newPlanName" placeholder="Plan Name" class="input-field" />

    <h4>Übungen hinzufügen</h4>
    
    <!-- Auswahlfelder und Eingabefelder zur Auswahl des Trainingstags und Eingabe der Übungsdetails -->
    <div class="exercise-inputs">
      <!-- Dropdown-Menü zur Auswahl des Trainingstags -->
      <select v-model="selectedDay" class="input-field select-field">
        <option disabled value="">Wähle einen Trainingstag</option>
        <option>Montag</option>
        <option>Dienstag</option>
        <option>Mittwoch</option>
        <option>Donnerstag</option>
        <option>Freitag</option>
        <option>Samstag</option>
        <option>Sonntag</option>
      </select>

      <!-- Checkbox zur Markierung eines Rest Days -->
      <label class="checkbox-container">
        <input type="checkbox" v-model="isRestDay"> Rest Day
      </label>

      <!-- Eingabefelder für die Übung, Sätze und Wiederholungen; werden deaktiviert, wenn Rest Day ausgewählt ist -->
      <input v-model="newExerciseName" placeholder="Übung" class="input-field" :disabled="isRestDay" />
      <input v-model="newExerciseSets" placeholder="Sätze" type="number" class="input-field" :disabled="isRestDay" />
      <input v-model="newExerciseReps" placeholder="Wiederholungen" type="number" class="input-field" :disabled="isRestDay" />
    </div>

    <!-- Button zum Hinzufügen der Übung oder des Rest Days zur Liste der Übungen -->
    <button @click="addExercise" class="button add-exercise-button">Übung hinzufügen</button>

    <!-- Liste der hinzugefügten Übungen anzeigen -->
    <ul class="exercise-list">
      <li v-for="(exercise, index) in newExercises" :key="index" class="exercise-item">
        <!-- Anzeige des Trainingstags und der Übungsdetails oder "Rest Day" -->
        {{ exercise.workoutDayName }}: 
        <span v-if="exercise.isRestDay">Rest Day</span>
        <span v-else>{{ exercise.exerciseName }}: {{ exercise.exerciseSets }} Sätze, {{ exercise.exerciseReps }} Wiederholungen</span>
        
        <!-- Button zum Entfernen der Übung aus der Liste -->
        <button @click="removeExercise(index)" class="button remove-button">Entfernen</button>
      </li>
    </ul>

    <!-- Button zum Hinzufügen des gesamten Plans zum Backend -->
    <button @click="addNewPlan" class="button add-plan-button">Plan hinzufügen</button>

    <!-- Nachricht, wenn keine Trainingspläne vorhanden sind -->
    <div v-if="plans.length === 0" class="no-plans">
      Keine Trainingspläne vorhanden.
    </div>

    <!-- Liste der gespeicherten Pläne aus dem Backend anzeigen -->
    <ul v-else class="plan-list">
      <li v-for="plan in plans" :key="plan.planId" class="plan-item">
        <!-- Plan-Name anzeigen -->
        <h2>{{ plan.planName }}</h2>
        <ul>
          <!-- Anzeigen der Tage im Plan, einschließlich Übungen oder Rest Days -->
          <li v-for="day in plan.workoutDays" :key="day.workoutDayId">
            {{ day.workoutDayName }}:
            <span v-if="day.restDay">Rest Day</span> 
            <span v-else>
              <ul>
                <!-- Anzeigen jeder Übung am jeweiligen Tag -->
                <li v-for="exercise in day.exercises" :key="exercise.exerciseId">
                  {{ exercise.exerciseName }}: {{ exercise.exerciseSets }} Sätze, {{ exercise.exerciseReps }} Wiederholungen
                </li>
              </ul>
            </span>
          </li>
        </ul>
        <!-- Button zum Löschen des Plans -->
        <button @click="deletePlan(plan.planId)" class="button remove-button">Plan löschen</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      plans: [], // Liste der bestehenden Pläne, die vom Backend geladen werden
      newPlanName: '', // Name des neuen Plans
      newExercises: [], // Liste der Übungen, die dem neuen Plan hinzugefügt werden
      newExerciseName: '', // Name der neuen Übung
      newExerciseSets: '', // Anzahl der Sätze für die neue Übung
      newExerciseReps: '', // Anzahl der Wiederholungen für die neue Übung
      selectedDay: '', // Der aktuell ausgewählte Trainingstag
      isRestDay: false // Markierung, ob der Tag ein Rest Day ist
    };
  },

  // Automatisch beim Laden der Komponente aufgerufen, um Pläne vom Backend zu holen
  mounted() {
    this.fetchPlans();
  },

  methods: {
    // Methode zum Abrufen aller vorhandenen Pläne vom Backend
    fetchPlans() {
      axios.get('https://webtech-projekt-backend-ws-2024-25.onrender.com/api/plans')
        .then(response => {
          this.plans = response.data.map(plan => ({...plan,
            workoutDays: plan.workoutDays.map(day => ({...day,
              restDay: day.restDay
            }))
          })); // Speichert die zurückgegebenen Pläne in der plans-Liste

        })
        .catch(error => {
          console.error("Fehler beim Laden der Trainingspläne:", error);
        });
    },

    // Methode zum Hinzufügen einer neuen Übung oder eines Rest Days zur newExercises-Liste
    addExercise() {
      if (!this.selectedDay) { // Überprüft, ob ein Trainingstag ausgewählt ist
        alert("Bitte einen Trainingstag auswählen!");
        return;
      }

      // Fügt entweder einen Rest Day oder eine Übung zur Liste hinzu
      if (this.isRestDay) {
        this.newExercises.push({
          workoutDayName: this.selectedDay,
          isRestDay: true,
          exercises: []
        });
      } else {
        this.newExercises.push({
          workoutDayName: this.selectedDay,
          isRestDay: false,
          exercises: [
            {
              exerciseName: this.newExerciseName,
              exerciseSets: this.newExerciseSets,
              exerciseReps: this.newExerciseReps
            }
          ]
        });
      }

      // Setzt die Eingabefelder zurück
      this.selectedDay = '';
      this.isRestDay = false;
      this.newExerciseName = '';
      this.newExerciseSets = '';
      this.newExerciseReps = '';
    },

    // Methode zum Entfernen einer Übung aus der newExercises-Liste
    removeExercise(index) {
      this.newExercises.splice(index, 1); // Entfernt das Element an der angegebenen Position
    },

    // Methode zum Hinzufügen eines neuen Plans zum Backend
    addNewPlan() {
  if (!this.newPlanName || this.newExercises.length === 0) {
    alert("Bitte einen Namen für den Plan eingeben und mindestens einen Tag hinzufügen!");
    return;
  }

  const newPlan = {
    planName: this.newPlanName,
    workoutDays: this.newExercises.map(exercise => ({
      workoutDayName: exercise.workoutDayName,
      restDay: exercise.isRestDay,
      exercises: exercise.isRestDay ? [] : exercise.exercises // Leere Liste für Rest Days
    }))
  };

  console.log("Senden des neuen Plans an das Backend:", newPlan);

  axios.post('https://webtech-projekt-backend-ws-2024-25.onrender.com/api/plans', newPlan)
    .then(response => {
      console.log("Plan erfolgreich hinzugefügt:", response.data);
      this.plans.push(response.data);
      this.newPlanName = '';
      this.newExercises = [];
      this.isRestDay = false;
    })
    .catch(error => {
      console.error("Fehler beim Hinzufügen des Plans:", error);
    });
}
,

    // Methode zum Löschen eines Plans basierend auf seiner ID
    deletePlan(planId) {
      axios.delete(`https://webtech-projekt-backend-ws-2024-25.onrender.com/api/plans/${planId}`)
        .then(() => {
          this.plans = this.plans.filter(plan => plan.planId !== planId); // Entfernt den Plan aus der plans-Liste
        })
        .catch(error => {
          console.error("Fehler beim Löschen des Plans:", error);
        });
    }
  }
};
</script>

<style scoped>
/* Hauptcontainer für die Planerstellung */
.plan-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Styling für Eingabefelder */
.input-field {
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 5px;
  width: calc(100% - 20px);
}

.select-field {
  width: 100%;
}

.checkbox-container {
  margin-top: 10px;
}

/* Button Styling */
.button {
  background-color: #ff6f61;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

.button:hover {
  background-color: #ff3d31;
}

.add-exercise-button, .add-plan-button {
  display: block;
  margin: 10px auto;
}

ul {
  list-style: none;
  padding: 0;
}

/* Styling für Planliste */
.plan-list {
  list-style: none;
  padding: 0;
}

.plan-item, .exercise-item, .day-item {
  background-color: #ffffff;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul ul {
  padding-left: 0;
  margin-left: 0;
}

</style>