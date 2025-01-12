import axios from 'axios';
export default (await import('vue')).defineComponent({
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
                this.plans = response.data.map(plan => ({ ...plan,
                    workoutDays: plan.workoutDays.map(day => ({ ...day,
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
            }
            else {
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
        },
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
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['button',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("plan-container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        placeholder: ("Plan Name"),
        ...{ class: ("input-field") },
    });
    (__VLS_ctx.newPlanName);
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("exercise-inputs") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: ((__VLS_ctx.selectedDay)),
        ...{ class: ("input-field select-field") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        disabled: (true),
        value: (""),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("checkbox-container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("checkbox"),
    });
    (__VLS_ctx.isRestDay);
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        placeholder: ("Übung"),
        ...{ class: ("input-field") },
        disabled: ((__VLS_ctx.isRestDay)),
    });
    (__VLS_ctx.newExerciseName);
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        placeholder: ("Sätze"),
        type: ("number"),
        ...{ class: ("input-field") },
        disabled: ((__VLS_ctx.isRestDay)),
    });
    (__VLS_ctx.newExerciseSets);
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        placeholder: ("Wiederholungen"),
        type: ("number"),
        ...{ class: ("input-field") },
        disabled: ((__VLS_ctx.isRestDay)),
    });
    (__VLS_ctx.newExerciseReps);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.addExercise) },
        ...{ class: ("button add-exercise-button") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: ("exercise-list") },
    });
    for (const [exercise, index] of __VLS_getVForSourceType((__VLS_ctx.newExercises))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: ((index)),
            ...{ class: ("exercise-item") },
        });
        (exercise.workoutDayName);
        if (exercise.isRestDay) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (exercise.exerciseName);
            (exercise.exerciseSets);
            (exercise.exerciseReps);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.removeExercise(index);
                } },
            ...{ class: ("button remove-button") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.addNewPlan) },
        ...{ class: ("button add-plan-button") },
    });
    if (__VLS_ctx.plans.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("no-plans") },
        });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: ("plan-list") },
        });
        for (const [plan] of __VLS_getVForSourceType((__VLS_ctx.plans))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                key: ((plan.planId)),
                ...{ class: ("plan-item") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            (plan.planName);
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [day] of __VLS_getVForSourceType((plan.workoutDays))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                    key: ((day.workoutDayId)),
                });
                (day.workoutDayName);
                if (day.restDay) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                }
                else {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
                    for (const [exercise] of __VLS_getVForSourceType((day.exercises))) {
                        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                            key: ((exercise.exerciseId)),
                        });
                        (exercise.exerciseName);
                        (exercise.exerciseSets);
                        (exercise.exerciseReps);
                    }
                }
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(!((__VLS_ctx.plans.length === 0))))
                            return;
                        __VLS_ctx.deletePlan(plan.planId);
                    } },
                ...{ class: ("button remove-button") },
            });
        }
    }
    ['plan-container', 'input-field', 'exercise-inputs', 'input-field', 'select-field', 'checkbox-container', 'input-field', 'input-field', 'input-field', 'button', 'add-exercise-button', 'exercise-list', 'exercise-item', 'button', 'remove-button', 'button', 'add-plan-button', 'no-plans', 'plan-list', 'plan-item', 'button', 'remove-button',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
