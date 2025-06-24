<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark navbar-dark">
    <div class="container-fluid --bs-body-bg">
      <a class="navbar-brand" href="#">My Todolist</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: ERouterPath.TodoHome }"
            >
              Todo
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: ERouterPath.InProgress }"
            >
              In Progress
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Completed</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { ERouterPath } from "@/model/const";
</script>
<style lang="scss" scoped></style>
