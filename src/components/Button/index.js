import './styles.scss';

export function Button ({...props}) {
  return (
    <button {...props} className="button-component"/>
  )
}