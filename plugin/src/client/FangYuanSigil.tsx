/** Decorative shell signature for the Fang Yuan theme. */
import css from './FangYuanSigil.module.css'

/**
 * Render the theme's character seal. The text is intentionally decorative
 * and hidden from the accessibility tree; it never competes with app status.
 * @returns the decorative seal.
 */
export function FangYuanSigil() {
  return (
    <div className={css.sigil} data-fang-yuan-sigil aria-hidden="true">
      <span className={css.cicada}>春秋蝉</span>
      <span className={css.name}>古月方源</span>
      <span className={css.motto}>求道不悔</span>
    </div>
  )
}
