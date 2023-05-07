
import PropTypes from 'prop-types';

function ActorList(props) {
  const actors = props.actors ? props.actors.split(', ') : [];

  const title = props.title;

  const buildActorLink = (actorName) => {
    const wikiUrl = `https://en.wikipedia.org/wiki/${actorName.replace(/\s+/g, '_')}`;
    return <a href={wikiUrl} target="_blank" rel="noopener noreferrer">{actorName}</a>;
  }

  const actorComponents = actors.map((actor, index) => {
    return (
      <span key={index} className="actor-link">
        {buildActorLink(actor)}
        {index < actors.length - 1 ? ', ' : ''}
      </span>
    );
  });

  return (
    <div className="actor-list">
      
      <p><strong>{title}:</strong> {actorComponents}</p>
    </div>
  );
}

ActorList.propTypes = {
  actors: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ActorList;
