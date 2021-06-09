<template>
  <div class="ui-input">
    <label v-if="label" class="ui-input--label" :for="id">{{ label }}</label>
    <div class="ui-input--container">
      <div v-if="prefix" class="ui-input--prefix">{{ prefix }}</div>
      <input
        :autocomplete="autocomplete"
        class="ui-input--input"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        v-model="value"
      />
    </div>
    <div v-if="message" class="ui-input--message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    autocomplete: String,
    id: String,
    label: String,
    name: String,
    message: String,
    placeholder: String,
    prefix: String,
    type: String,
    modelValue: String,
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style scoped>
.ui-input {
  width: 100%;
}

.ui-input--label {
  display: block;
  padding: 0.25rem .7rem;
  color: var(--ui-input-label);
}

.ui-input--container {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--ui-input-border);
  border-radius: 8px;
  box-sizing: border-box;
  background-color: var(--ui-input-bg);
}

.ui-input--prefix {
  box-sizing: border-box;
  height: 100%;
  padding: .35rem .7rem;
  border-right: 1px solid var(--ui-input-border);
}

.ui-input--input {
  width: 100%;
  padding: .5rem .7rem;
  border: 0px solid transparent;
  background-color: transparent;
  font-size: var(--ui-input-font-size);
  color: var(--ui-input-filled);
}

.ui-input--input::placeholder {
  color: var(--ui-input-placeholder);
}

.ui-input--input:focus-visible {
  outline: none;
}

.ui-input--input:-webkit-autofill {
 -webkit-text-fill-color: var(--ui-input-filled);
 box-shadow: 0 0 0px 1000px var(--ui-input-bg) inset;
}
</style>
