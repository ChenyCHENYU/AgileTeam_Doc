<template>
  <div class="call-to-action">
    <div class="cta-content">
      <h3>🎯 期待共建</h3>
      <p><strong>如果这个项目对你有帮助，请给个 Star ⭐️ 支持一下！</strong></p>
      <div class="github-badges">
        <a
          :href="`https://github.com/${owner}/${repo}`"
          class="github-button"
          target="_blank"
        >
          <img
            :src="`https://img.shields.io/github/stars/${owner}/${repo}?style=social`"
            alt="GitHub stars"
          />
        </a>
        <a
          :href="`https://github.com/${owner}/${repo}/fork`"
          class="github-button"
          target="_blank"
        >
          <img
            :src="`https://img.shields.io/github/forks/${owner}/${repo}?style=social`"
            alt="GitHub forks"
          />
        </a>
        <a
          :href="`https://github.com/${owner}/${repo}/issues`"
          class="github-button"
          target="_blank"
        >
          <img
            :src="`https://img.shields.io/github/issues/${owner}/${repo}?style=social`"
            alt="GitHub issues"
          />
        </a>

        <a
          :href="`https://github.com/${owner}/${repo}`"
          class="github-button"
          target="_blank"
        >
          <img
            :src="`https://img.shields.io/github/last-commit/${owner}/${repo}?style=social`"
            alt="GitHub last commit"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GitHubBadges",
  props: {
    owner: {
      type: String,
      default: "ChenyCHENYU",
    },
    repo: {
      type: String,
      default: "Robot_Admin",
    },
  },
};
</script>

<style scoped>
.call-to-action {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  color: white;
  margin: 3rem 0;
}

.cta-content h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.cta-content p {
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
}

.github-badges {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1rem;
}

.github-button {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  text-decoration: none;
}

.github-button:hover {
  transform: translateY(-2px);
}

.github-button img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  filter: brightness(1.1);
}

@media (max-width: 768px) {
  .github-badges {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    max-width: 400px;
  }
}

@media (max-width: 480px) {
  .github-badges {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    max-width: 280px;
  }

  .cta-content h3 {
    font-size: 1.3rem;
  }

  .cta-content p {
    font-size: 1rem;
  }
}
</style>
