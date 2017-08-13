import RawGateway from './gateway';
import { signJSON } from './sha256-browserify';

export default class Gateway extends RawGateway {
  constructor(props) {
    super({ ...props, signJSON, signParam: signJSON });
  }
}
