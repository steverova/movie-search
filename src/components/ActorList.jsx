
import PropTypes from 'prop-types';

function ActorList(props) {
  const actors = props.actors ? props.actors.split(', ') : [];
  const title = props.title;
  const icon = props.icon;

  const pastelColors = ['#4d455d', '#e96479', '#7db9b6', '#ea5455', '#22a39f', '#ff6e31', '#804674', '#735f32', '#7286d3', '#8b7e74', "#90c8ac" ];

  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

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
      
      <p><span style={{color: randomColor}} >{icon}</span><strong style={{marginLeft: "10px"}}>{title}:</strong> {actorComponents}</p>
    </div>
  );
}

ActorList.propTypes = {
  actors: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
};

export default ActorList;
