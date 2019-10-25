export default {
  computed: {
    permission: function () {
      return this.$store.state.projectPermission;
    }
  }
}