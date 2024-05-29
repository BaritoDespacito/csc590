using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class DragonMove : MonoBehaviour
{
    
    [SerializeField] private float normalSpeed = 3.5f;
    [SerializeField] private float attackSpeed = 7f;
    
    private double AttackDist = 10;
    private int MoveDist = 50;
    
    [SerializeField] private bool swoopingDown = false;
    [SerializeField] private bool swoopingUp = false;
    
    public NavMeshAgent agent;
    public GameObject player;
    
    private Vector3 target;
    private Vector3 originalPos;
    private Vector3 newPos;
    
    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        if (Vector3.Distance(transform.position, player.transform.position) <= AttackDist || swoopingUp || swoopingDown)
        {
            agent.enabled = false;
            if (!swoopingDown && !swoopingUp)
            {
                swoopingDown = true;
                target = new Vector3(player.transform.position.x, -2, player.transform.position.z);
                originalPos = transform.position;
                newPos = new Vector3(target.x + (target.x - originalPos.x), originalPos.y, target.z + (target.z - originalPos.z));
                // Debug.Log("newPos: " + newPos + "target: " + target + "originalPos: " + originalPos);
            }
            else if (swoopingDown)
            {
                if (Vector3.Distance(target, transform.position) > 0.5)
                {
                    transform.LookAt(target);
                    transform.position += transform.forward * attackSpeed * Time.deltaTime;
                }
                else
                {
                    swoopingDown = false;
                    swoopingUp = true;
                    // Debug.Log("swooping up");
                }
            }
            else
            {
                if (Vector3.Distance(newPos, transform.position) > 0.5)
                {
                    transform.LookAt(newPos);
                    transform.position += transform.forward * attackSpeed * Time.deltaTime;
                }
                else
                {
                    swoopingUp = false;
                    // Debug.Log("done swooping");
                }
            }
        }
        else if (Vector3.Distance(transform.position, player.transform.position) <= MoveDist && !swoopingDown && !swoopingUp)
        {
            agent.enabled = true;
            agent.SetDestination(player.transform.position);
            agent.speed = normalSpeed;
        }
    }
    
    private void OnTriggerEnter(Collider other)
    {
        // Debug.Log("enemy hit");
        if (other.gameObject.CompareTag("Bullet"))
        {
            Destroy(gameObject);
        }
    }
}
