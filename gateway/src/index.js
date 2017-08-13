import RawGateway from './gateway';
import { signJSON, signParam } from './sha256';

export default class Gateway extends RawGateway {
  constructor(props) {
    super({ ...props, signJSON, signParam });
  }
}
