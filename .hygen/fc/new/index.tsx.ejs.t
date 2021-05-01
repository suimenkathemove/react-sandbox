---
to: <%= abs_path %>/index.tsx
---
<% if (have_style) { -%>
import styles from './styles.module.scss'

<% } -%>
<% if (have_props) { -%>
type Props = {
};

<% } -%>
export const <%= component_name %>: <%- type_annotate %> = (<%= props %>) => (
<% if (have_style) { -%>
  <<%= tag %> className={styles.base}>
<% } else { -%>
  <<%= tag %>>
<% } -%>
  </<%= tag %>>
);
