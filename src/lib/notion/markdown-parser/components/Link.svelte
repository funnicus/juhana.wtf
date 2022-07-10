<script lang="ts">
	export let href: string
  export let title: string
</script>

<a {href} {title}><slot></slot></a>