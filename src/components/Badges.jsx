import '../assets/Badgess.css';
import PropTypes from 'prop-types';

function Badges(props) {
  const pastelColors = ['#4d455d', '#e96479', '#7db9b6', '#ea5455', '#22a39f', '#ff6e31'];
  const badges = props.badges
    .filter(badge => badge !== "N/A") // filtrar los badges con valor "N/A"
    .map((badge, index) => {
      const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      const badgeStyle = { backgroundColor: randomColor };

      return (
        <span key={index} className="badge" style={badgeStyle}>
          {badge}
        </span>
      );
    });

  return (
    <div  className="badges-container">
      {badges}
    </div>
  );
}




Badges.propTypes = {
  badges: PropTypes.string.isRequired
};

export default Badges;