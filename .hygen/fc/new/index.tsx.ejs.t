---
to: <%= abs_path %>/index.tsx
---
<% if (have_style) { -%>
import styles from "./styles.module.scss"

<% } -%>
<% if (have_props) { -%>
type Props = {
};

<% } -%>
export const <%= component_name %>: <%- type_annotate %> = (<%= props %>) => {
<% if (have_style) { -%>
  return <<%= tag %> className={styles.base}></<%= tag %>>
<% } else { -%>
  return <<%= tag %>></<%= tag %>>
<% } -%>
};
