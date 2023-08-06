<script setup lang="ts">
interface Link {
  title?: string;
  href: string;
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
}
const links:Link[] = [
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/askomarov/",
    icon: "linkedin",
  },
  {
    title: "upwork",
    href: "https://www.upwork.com/freelancers/~018bdbfb35f7a23234",
    icon: "upwork",
    iconWidth: 70,
    iconHeight: 24,
  },
  {
    title: "github",
    href: "https://github.com/askomarov",
    icon: "github-logo",
  },
  {
    href: "https://hh.ru/resume/a1231aa6ff07ed152a0039ed1f474b39764c7a",
    icon: "hh",
    iconWidth: 48,
    iconHeight: 48,
  },
];
</script>
<template>
  <div>
    <h2 class="main-title">My 👨🏻‍💻Contacts</h2>
    <ul>
      <li v-for="(link, i) in links" :key="i">
        <a
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="main-link outline secondary"
          :class="link.title"
        >
          <svg
            v-if="link.icon"
            :width="link.iconWidth || 24"
            :height="link.iconHeight || 24"
          >
            <use :href="`../src/assets/sprite_auto.svg#${link.icon}`"></use>
          </svg>
          <span v-show="link.title != 'upwork'">
            {{ link.title }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 768px;
  margin-inline: auto;
  margin-block: 0;
  gap: 1rem;
}

.main-link {
  text-transform: uppercase;
  border-radius: 12px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  color: #fff;

  &.linkedin {
    background-color: #0a66c2;
  }

  &.upwork {
    background-color: #14a800;
  }

  &.github {
    background-color: #24292f;
  }
}
</style>
