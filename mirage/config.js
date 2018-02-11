import moment from 'moment';

export default function() {
  this.namespace = '/api';

  this.patch('/groups/:id');
  this.put('/groups/:id');
  this.post('/groups', function(scheme) {
    const attrs = this.normalizedRequestAttrs();
    const date = moment().add(1, 'week').isoWeekday(attrs.dayOfWeek).format('L');
    attrs.nextDate = moment(`${date} ${attrs.time}`, 'L LT').toDate();
    return scheme.groups.create(attrs);
  });
  this.get('/groups');
  this.get('/groups/:id');
  this.delete('/groups/:id');

  this.get('/locations/:id');
  this.patch('/locations/:id');
  this.post('/locations', function(scheme) {
    const attrs = this.normalizedRequestAttrs();
    const group = scheme.groups.find(attrs.groupId);
    const location = group.createLocation(attrs);
    if (group.locationIds.length === 1) {
      skipLocation(group, scheme);
    }
    return location;
  });
  this.put('/locations/:id');
  this.delete('/locations/:id', (scheme, request) => {
    const id = request.params.id;
    const location = scheme.locations.find(id);
    const group = location.group;
    if (group.nextLocation.id === location.id) {
      skipLocation(group, scheme);
    }
    location.destroy();
  });

  function isLocationActive(locationId, scheme) {
    const location = scheme.db.locations.find(locationId);
    return location.active;
  }

  function getActiveLocations(group, scheme) {
    return scheme.db.locations.where({
      active: true,
      groupId: group.id,
    });
  }

  function skipLocation(group, scheme) {
    let nextLocationId = group.nextLocationId;
    const activeLocations = getActiveLocations(group, scheme).mapBy('id');
    const index = activeLocations.indexOf(nextLocationId);
    if (activeLocations.length === 1 && activeLocations[index] === nextLocationId) {
      return;
    }
    do {
      if (index === activeLocations.length - 1) {
        nextLocationId = activeLocations[0];
      } else {
        nextLocationId = activeLocations[index + 1];
      }
    } while (!isLocationActive(nextLocationId, scheme))
    scheme.db.groups.update(group.id, {
      nextLocationId,
    });
  }

  this.post('/groups/:id/actions/skip-location', (scheme, request) => {
    const groupId = request.params.id;
    const group = scheme.db.groups.find(groupId);
    skipLocation(group, scheme);
  });

  this.post('/groups/:id/actions/skip-date', (scheme, request) => {
    const groupId = request.params.id;
    const group = scheme.db.groups.find(groupId);
    const nextDate = moment(group.nextDate).add(1, 'weeks');
    scheme.db.groups.update(groupId, {
      nextDate,
    });
  });
}
