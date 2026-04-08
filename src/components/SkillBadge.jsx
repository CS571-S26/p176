import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getTagStyle, getTagCategory } from '../data/skillColors';

function SkillBadge({ tag, size = '0.75rem' }) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{getTagCategory(tag)}</Tooltip>}
    >
      <span
        className="badge me-1 mb-1"
        style={{ ...getTagStyle(tag), fontSize: size, cursor: 'default' }}
      >
        {tag}
      </span>
    </OverlayTrigger>
  );
}

export default SkillBadge;